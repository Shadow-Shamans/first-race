import { Layer } from './Layer'

export class Text {
  score = 0
  items = 0
  x = 32
  y = 32 + 16
  message = 'To start the game press space'

  constructor(private _layer: Layer) {
    this._layer.ctx.font = '20px Arial'
    this._layer.ctx.fillStyle = '#fff'
  }

  display = () => {
    this._layer.ctx.clearRect(0, 0, this._layer.sW, this._layer.sH)
    this._layer.ctx.fillText(this.message, this.x, this.y)
  }

  addScore = () => {
    this.score += 1
    this.message = `Score: ${this.score}`
  }

  clear = () => {
    this.score = 0
    this.message = 'To start the game press space'
  }
}
