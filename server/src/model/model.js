const { intensity, random, test, maxIntensity, fakeBrain, oneByOne } = require('./programs');
const { hexToRGB, RGBtoString, RGBAToHex } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');
/*
* Controls the grid array
*/
class Model {
  constructor(w, h) {
    this.grid = [...new Array(h * 3)].map((y, i) => [...new Array(w * 3)].map((x, j) => '#000000'));

    this.modes = this.createModes();
    this.selectedMode = 'test4';

    this.startDelay = 500;
    this.frequency = 10;

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
      test4: maxIntensity,
      brainActivity: fakeBrain,
      oneByOne: oneByOne
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
    this.brightness(this.maxBrightness);
  }

  /* Start updating the model with a set mode */
  startAnimation() {
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
