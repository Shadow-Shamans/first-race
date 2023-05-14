export class Star {
  x: number
  y: number
  length: number
  opacity: number
  factor = 1
  increment: number = Math.random() * 0.03

  constructor(
    private _ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    opacity: number
  ) {
    this.x = x
    this.y = y
    this.length = length
    this.opacity = opacity
  }

  draw = (screenW: number, screenH: number) => {
    const ctx = this._ctx
    ctx.rotate((Math.PI * 1) / 10)

    // Save the ctx
    ctx.save()

    // move into the middle of the canvas, just to make room
    ctx.translate(this.x, this.y)

    // Change the opacity
    if (this.opacity > 1) {
      this.factor = -1
    } else if (this.opacity <= 0) {
      this.factor = 0.1

      this.x = Math.round(Math.random() * screenW)
      this.y = Math.round(Math.random() * screenH)
    }

    this.opacity += this.increment * this.factor

    ctx.beginPath()
    for (let i = 5; i--; ) {
      ctx.lineTo(0, this.length)
      ctx.translate(0, this.length)
      ctx.rotate((Math.PI * 2) / 10)
      ctx.lineTo(0, -this.length)
      ctx.translate(0, -this.length)
      ctx.rotate(-((Math.PI * 6) / 10))
    }
    ctx.lineTo(0, this.length)
    ctx.closePath()
    ctx.fillStyle = 'rgba(255, 255, 200, ' + this.opacity + ')'
    ctx.shadowBlur = 5
    ctx.shadowColor = '#ffff33'
    ctx.fill()

    ctx.restore()
  }
}
