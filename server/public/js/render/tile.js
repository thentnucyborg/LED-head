
export class Tile {
  constructor(x, y) {
    this.color = '#ff00ffff'
    this.x = x
    this.y = y
  }

  getColor() {
    return this.color
  }

  setColor(color) {
    this.color = color
  }

  setAlpha(a) {
    this.color = `${this.color.substring(0,7)}${a}`
  }
}