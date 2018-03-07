import { Tile } from './tile.js'

export class Grid {
  /*
   * Creates a (3n)*(3n) grid. Top with 4x sides.
   *  _______
   *  |  x  |
   *  |x t x| 
   *  |__x__|
   */
  constructor(n) {
    this.width = n
    this.height = n
    this.grid = [...new Array(n*3)].map((x, i) => [...new Array(n*3)].map((y, j) => new Tile(i, j)))
    this.phase = 0
  }

  getSides() {
    const {width: w, height: h} = this.getDimensions()
    return {
      top: this.grid.slice(h, w*2).map(x => x.slice(h, w*2)),
      first: this.grid.slice(0, w).map(x => x.slice(h, w*2)),
      second: this.grid.slice(h, w*2).map(x => x.slice(h*2, w*3)),
      third: this.grid.slice(h*2, w*3).map(x => x.slice(h, w*2)),
      fourth: this.grid.slice(h, w*2).map(x => x.slice(0, w))
    }
  }

  getGrid() {
    return this.grid
  }

  getDimensions() {
    return {height: this.height, width: this.width}
  }

  /* Callback with tile to do changes every */
  every(f) {
    this.grid.forEach(row => row.forEach(tile => f(tile)))
  }

  /* Callback with tile to do changes on single */
  single(x, y, f) {
    f(this.grid[x, y])
  }

  /* Called in intervals */
  update() {

  }
}