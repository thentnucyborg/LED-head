import { Grid } from './grid.js'
import { Draw } from './draw.js'

export class Render {

  constructor() {
    this.grid = new Grid(10)
    this.draw = new Draw(this.grid)
    this.fps = 30
  }
  
  start() {
    this.update()
  }

  /* Map all tiles to matrix tiles */
  updateGrid(grid) {
    grid.forEach((r, y) => r.forEach((c, x) => this.grid.single(x, y, (tile) => {tile.setColor(c) })))
  }

  update() {
    setTimeout(() => {
      //this.grid.update()
      this.draw.draw()

      requestAnimationFrame(() => this.update())
    }, 1000 / this.fps)
  }

}
