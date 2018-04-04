/*
 * Creates a (3n)*(3n) grid. Top with 4x sides.
 *  _______
 *  |  x  |
 *  |x t x| 
 *  |__x__|
 */
export class Grid {
  constructor(n) {
    this.grid = [...new Array(n*3)].map((x, i) => [...new Array(n*3)].map((y, j) => 'rgba(0, 0, 0, 0)'));
    this.phase = 0;
  }

  /* Returns object with specific labels */
  getSides() {
    const h = this.grid.length / 3;
    const w = this.grid[0].length / 3;
    return {
      top: this.grid.slice(h, w*2).map(x => x.slice(h, w*2)),
      first: this.grid.slice(0, w).map(x => x.slice(h, w*2)),
      second: this.grid.slice(h, w*2).map(x => x.slice(h*2, w*3)),
      third: this.grid.slice(h*2, w*3).map(x => x.slice(h, w*2)),
      fourth: this.grid.slice(h, w*2).map(x => x.slice(0, w))
    };
  }

  /* Returns grid */
  getGrid() {
    return this.grid;
  }

  /* Sets new grid */
  setGrid(grid) {
    this.grid = grid; 
  }
}
