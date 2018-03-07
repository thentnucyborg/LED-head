
export class Draw {
  constructor(grid) {
    this.canvas = document.getElementById('myCanvas')
    this.context = this.canvas.getContext('2d')
    this.grid = grid
    this.fps = 30
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawCube(this.grid.getSides())
  }

  drawCube(grid) {
    const ctx = this.context
    const w = 20

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

    grid.top.forEach((l, x) => l.forEach((e, y) => drawTop((x+y)*w+75, 150+y*w-(w*x/2)-(y*w/2), w, e.getColor())))
    grid.first.forEach((l, x) => l.forEach((e, y) => drawLeft(x*w+75, 150+y*w + (w*x/2), w, e.getColor())))
    grid.second.forEach((l, x) => l.forEach((e, y) => drawRight(x*w+75 + (l.length - 1) * w, 150+y*w + ((l.length - x) * w/2) - w/2, w, e.getColor())))
  }
}