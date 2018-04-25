const { intensity, random, test, shift, nothing, maxIntensity, fakeBrain, oneByOne } = require('./programs');
const { hexToRGB, RGBtoString, RGBAToHex } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');

/*
* Controls the grid array
*/
class Model {
  constructor(w, h, freq, mode) {
    this.grid = [...new Array(h)].map((y, i) => [...new Array(w)].map((x, j) => '#000000'));

    this.shows = this.createShow();
    this.selectedShow = 'm2';

    this.interval;
    this.startDelay = 500;
    this.frequency = 500;
    this.maxBrightness = 1.0;

    this.currentTime = + new Date();
    this.previousTime = + new Date();
    this.deltaTime = 0;
  }

  /* Create object with the different modes */
  createShow() {
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
    this.selectedShow = `m${show}`;
  }

  /* Return as promise to startPulseAnimation chain methods in parent class */
  getData() {
    return Promise.resolve({data: this.grid});
  }

  /* Set new grid */
  setData(grid) {
    // Todo - check if data is correct
    this.grid = (grid instanceof String) ? JSON.parse(grid) : grid;
    this.brightness(this.maxBrightness);
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

  /* Update the grid */
  update({...params}) {
    this.grid = this.shows[this.selectedShow] ? this.shows[this.selectedShow](params) : this.shows['m1'];
  }
}

module.exports = Model;
