import { Grid } from './grid.js';
import { Draw } from './draw.js';

export class Render {

  constructor() {
    this.grid = new Grid(9);
    this.draw = new Draw();
    this.fps = 30;
  }
  
  start() {
    this.render();
  }

  render() {
    setTimeout(() => {
      this.draw.draw(this.grid);
      requestAnimationFrame(() => this.render());
    }, 1000 / this.fps);
  }

  update(grid) {
    this.grid.setGrid(grid);
  }
}
