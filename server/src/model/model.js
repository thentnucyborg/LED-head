const { hexToRGB, RGBtoString } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');

/*
* Controls the grid array
*/
class Model {
  constructor() {
    const n = 9;
    this.grid = [...new Array(n*3)].map((x, i) => [...new Array(n*3)].map((y, j) => '#000000'));

    this.start();
    this.modes = this.createModes();
    this.selectedMode = 'test1';

    this.startDelay = 500;
    this.frequency = 10;
  }

  /* Create object with the different modes */
  createModes() {
    // In the future move to different location.
    return {
      test1: (dt) => this.grid.map(r => r.map(tile => RGBtoString({ r: 255, g: 0, b: 255, a: dt % 255 }))),
      test2: () => {},
    };
  }

  /* Return as promise to start chain methods in parent class */
  getData() {
    return Promise.resolve({ data: this.grid });
  }

  /* Set new grid */
  setData(grid) {
    // Todo - check if data is correct
    this.grid = grid;
  }

  /* Start updating the model with a set mode */
  start() {
    console.log(`Start model changes ${this.selectedMode}`);
    // Todo - change to change in time (delta time) instead of counter.
    function* generator(i=0, increment=0.05) { while(true) yield i += increment; }
    const counter = generator(0, 1);

    setTimeout(() => { 
      setInterval(() => {
        this.update(counter.next().value);
      }, this.frequency);
    }, this.startDelay);
  }

  /* Update the grid */
  update(dt) {
    this.grid = this.modes[this.selectedMode](dt);
  }
}

module.exports = Model;
