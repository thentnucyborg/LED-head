import { Grid } from './grid.js';
import { Draw } from './draw.js';

/*
* Controls the render loop
*/
export class Render {
  constructor() {
    this.grid = new Grid(9);
    this.draw = new Draw();
    this.fps = 30;
  }
  
  /* Start render loop */
  start() {
    this.render();
  }

  /* Stop render loop */
  stop() {
    // Todo - stop
  }

  /* Render loop, draws the grid */
  render() {
    setTimeout(() => {
      this.draw.draw(this.grid);
      requestAnimationFrame(() => this.render());
    }, 1000 / this.fps);
  }

  /* Set new grid */
  update(grid) {
    this.grid.setGrid(grid);
  }
}
