const { intensity, random, test } = require('./programs');

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
