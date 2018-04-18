
const { intensity, random, test } = require('./programs');
const { hexToRGB, RGBtoString, RGBAToHex } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');
const p = 5*60
const f = 1/255

/*
* Controls the grid array
*/
class Model {
    constructor(w, h) {
        this.grid = [...new Array(h * 3)].map((y, i) => [...new Array(w * 3)].map((x, j) => '#000000'));

        this.modes = this.createModes();
        this.selectedMode = 'test1';

        this.startDelay = 500;
        this.frequency = 10;
        this.maxBrightness = 1.0;
  
        this.currentTime = + new Date();
        this.previousTime = + new Date();
        this.deltaTime = 0;
    }

    /* Create object with the different modes */
    createModes() {
        return {
          test1: test,
          test2: random,
          test3: intensity,
        };
    }

    /* Return as promise to startPulseAnimation chain methods in parent class */
    getData() {
        return Promise.resolve({data: this.grid});
    }

    /* Set new grid */
    setData(grid) {
        // Todo - check if data is correct
        this.grid = (grid instanceof String) ? JSON.parse(grid) : grid;
        this.brightness(this.maxBrightness)
    }

    setMaxBrightness(x) {
        this.maxBrightness = (x <= 1) ? x : 1
    }

    /* Constricts all LEDS to maximum brightness */
    brightness(x) {
        if (x >= 1) {
            return
        }
        this.grid.map(row => row.map(val => {
            c = hexToRGB(val);
            return RGBAToHex({r: (c.r * x), g: (c.g * x), b: (c.b * x), a: c.a})
        }))
    }

    powerUsage() {
        let sum = 0.0
        this.grid.forEach(row => row.forEach(val => {
            c = hexToRGB(val);
            sum += c.r + c.g + c.b
        }))
        return p * sum * f // power = norm(5 * 60 * colorChannelIntencity)
    }

      /* Start updating the model with a set mode */
  start() {
    console.log(`Start model changes ${this.selectedMode}`);

    setTimeout(() => { 
      setInterval(() => {
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

  /* Update the grid */
  update({...params}) {
    this.grid = this.modes[this.selectedMode](params);
  }
}

module.exports = Model;
