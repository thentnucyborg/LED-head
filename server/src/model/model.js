const { intensity, random, test, shift, nothing, maxIntensity, fakeBrain, oneByOne } = require('./programs');
const { hexToRGB, RGBAToHex } = require('../utils/colorUtils');

/*
* Controls the grid array
*/
class Model {
  constructor({ frequency, startDelay, show }) {
    this.grid = [[]];
    this.shows = this.createShows();
    this.selectedShow = `m${show}`;
    this.defaultShow = 'm1';

    this.interval;
    this.startDelay = startDelay;
    this.frequency = frequency;
    this.maxBrightness = 1.0;

    this.currentTime = + new Date();
    this.previousTime = + new Date();
    this.deltaTime = 0;
  }

  /* Create object with the different modes */
  createShows() {
    return {
      m1: nothing,
      m2: test,
      m3: random,
      m4: intensity,
      m5: shift,
      m6: maxIntensity,
      m7: fakeBrain,
      m8: oneByOne,
    };
  }

  /* Set mode */
  setShow(show = 1) {
    this.clearGrid();
    this.selectedShow = `m${show}`;
  }

  /* Return as promise to startPulseAnimation chain methods in parent class */
  getData() {
    return Promise.resolve({ data: this.grid });
  }

  clearGrid() {
    this.grid = this.grid.map((row) => row.map((val) => '#000000'));
  }

  /* Set new grid from json format */
  setData(grid) {
    // needs error handling..
    this.grid = (grid instanceof String) ? JSON.parse(grid) : grid;
    this.brightness(this.maxBrightness);
  }

  setGrid({ width, height }) {
    this.grid = [...new Array(height)].map((y, i) => [...new Array(width)].map((x, j) => '#000000'));
  }

  setMaxBrightness(x) {
    this.maxBrightness = (x <= 1) ? x : 1;
  }

  /* Constricts all LEDS to maximum brightness */
  brightness(x) {
    if (x >= 1) return;
    this.grid.map(row => row.map(val => {
      const { r, g, b, a } = hexToRGB(val);
      return RGBAToHex({r: (r * x), g: (g * x), b: (b * x), a: a});
    }));
  }

  powerUsage() {
    const p = 5*60;
    const f = 1/255;
    let sum = 0.0;
    this.grid.forEach(row => row.forEach(val => {
      const { r, g, b } = hexToRGB(val);
      sum += r + g + b;
    }));
    return p * sum * f; // power = norm(5 * 60 * colorChannelIntencity)
  }

  /* Start updating the model with a set show */
  start() {
    console.log(`Start model changes ${this.selectedShow}`);

    setTimeout(() => { 
      this.interval = setInterval(() => {
        this.currentTime = + new Date();
        this.deltaTime = this.currentTime - this.previousTime;
        this.previousTime = this.currentTime;

        this.update({
          dt: this.deltaTime,
          time: this.currentTime,
          grid: this.grid,
        });
      }, this.frequency);
    }, this.startDelay);
  }

  /* Stops the update interval */
  stop() {
    clearInterval(this.interval);
  }

  /* Update the grid with params = {dt, time, grid} */
  // Needs error handling...
  update({...params}) {
    try {
      this.grid = this.shows[this.selectedShow] ? this.shows[this.selectedShow](params) : this.shows[this.defaultShow];
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = Model;
