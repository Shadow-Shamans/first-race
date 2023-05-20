import type { Layer } from './Layer'
import { Star } from './Star'

export class Bg {
  stars: Star[] = []

  constructor(private _layer: Layer) {
    const numStars = 50
    const screenW = this._layer.sW
    const screenH = this._layer.sH

    for (let i = 0; i < numStars; i++) {
      const x = Math.round(Math.random() * screenW)
      const y = Math.round(Math.random() * screenH)
      const length = 1 + Math.random() * 2
      const opacity = Math.random()

      const star = new Star(this._layer.ctx, x, y, length, opacity)

      this.stars.push(star)
    }
  }

  display = () => {
    const { sW, sH, ctx } = this._layer
    ctx.clearRect(0, 0, sW, sH)
    const grd = ctx.createRadialGradient(
      sW / 2,
      sH / 2,
      sH / 4,
      sW / 2,
      sH / 2,
      sH / 2
    )
    grd.addColorStop(0, '#091d2f')
    grd.addColorStop(1, '#121a1f')

    this._layer.ctx.fillStyle = grd
    this._layer.ctx.fillRect(0, 0, this._layer.sW, this._layer.sH)

    this.stars.forEach(star => {
      star.draw(this._layer.sW, this._layer.sH)
    })
  }
}
