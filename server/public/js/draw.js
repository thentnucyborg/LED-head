// https://codepen.io/AshKyd/pen/JYXEpL
// shade box from http://stackoverflow.com/questions/5560248

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

class Tile {
  constructor(x, y) {
    this.color = { r: 0, g: 255, b: 255, a: 0 }
    this.x = x
    this.y = y
  }

  getRGBA() {
    const {r, g, b, a} = this.color
    return `rgba(${r},${g},${b},${a})`
  }

  getHex() {
    const {r, g, b, a} = this.color
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${(a * 255).toString(16).substring(0,2)}`
  }

  setColor(r, g, b, a) {
    this.color = { r: r, g: g, b: b, a: a }
  }

  setAlpha(a) {
    this.color.a = a
  }
}


class Grid {
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
    return {
      top: this.grid.slice(10,20).map(x => x.slice(10,20)),
      first: this.grid.slice(0,10).map(x => x.slice(10,20)),
      second: this.grid.slice(10,20).map(x => x.slice(20,30)),
      third: this.grid.slice(20,30).map(x => x.slice(10,20)),
      fourth: this.grid.slice(10,20).map(x => x.slice(0,10))
    }
  }

  getGrid() {
    console.log(this.grid)
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

  /* Map all tiles to matrix tiles */
  matrix(matrix) {
    if (matrix.length === this.height && matrix[0].length === this.width) {
      matrix.forEach((row, y) => row.forEach((color, x) => {
          this.grid[x, y].setColor(color.r, color.g, color.b, color.r)
      }))
    }
  }

  /* TODO: Er dette kun for å vise demo? */
  update() {
    this.intensify()
  }

  /* 
   * Various examples 
   */

  // All Random
  randomize() {
    const r = () => Math.round(Math.random() * 255)
    const a = r()
    this.every((tile) => tile.setColor(1, a, 0, 1))
  }

  // Color intensify up and down
  intensify() {
    this.every((tile) => {
      this.phase += 0.00005
      tile.setAlpha( (Math.sin(this.phase)/2 + 0.5))
    })
  }

  // Color the whole thing in single color
  paint(r, g, b, a) {
    this.every((tile) => tile.setColor(r, g, b, a))
  }

  /* */
  rainbow() {

  }

  // Random food appear, snake eats it and gets bigger
  snake() {
    console.log('SNAKE')
  }

  show() {

  }

}

const randomRGB = () => `#${Math.floor(Math.random()*16777215).toString(16)}`


class Draw {
  constructor(grid) {
    this.canvas = document.getElementById('myCanvas')
    this.ctx = canvas.getContext('2d')
    this.grid = grid
    this.fps = 120
  }

  start() {
    this.update()
  }

  update() {
      setTimeout(() => {
      this.grid.update()
      this.draw()

      requestAnimationFrame(() => this.update())
    }, 1000 / this.fps)
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCube(this.grid.getSides(), 200, 300)
  }

}



const grid = new Grid(10)
const draw = new Draw(grid)
draw.start()


const drawCube = (grid, x, y) => {
  const w = 20
  grid.top.forEach((l, x) => l.forEach((e, y) => drawTop((x+y)*w+75, 150+y*w-(w*x/2)-(y*w/2), w, e.getRGBA())))
  grid.first.forEach((l, x) => l.forEach((e, y) => drawLeft(x*w+75, 150+y*w + (w*x/2), w, e.getRGBA())))
  grid.second.forEach((l, x) => l.forEach((e, y) => drawRight(x*w+75 + (l.length - 1) * w, 150+y*w + ((l.length - x) * w/2) - w/2, w, e.getRGBA())))
}

const drawLeft = (x, y, w, color) => {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x - w, y - w * 0.5)
  ctx.lineTo(x - w, y - w * 1.5)
  ctx.lineTo(x, y - w)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.fill()
}

const drawRight = (x, y, w, color) => {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + w, y - w * 0.5)
  ctx.lineTo(x + w, y - w * 1.5)
  ctx.lineTo(x, y - w)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.fill()
}

const drawTop = (x, y, w, color) => {
  ctx.beginPath()
  ctx.moveTo(x, y - w)
  ctx.lineTo(x - w, y - w * 1.5)
  ctx.lineTo(x, y - w * 2)
  ctx.lineTo(x + w, y - w * 1.5)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.fill()
}




