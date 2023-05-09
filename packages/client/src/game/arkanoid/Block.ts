import { getRandomColor } from './utils'
import { Layer } from './Layer'
import { defaultBlockHeight, defaultBlockWidth } from './constants'

export class Block {
  x: number
  y: number
  active = true
  w: number = defaultBlockWidth
  h: number = defaultBlockHeight
  color: string

  constructor(private _layer: Layer, x: number, y: number) {
    this.x = x
    this.y = y
    this.color = getRandomColor()
  }

  display = () => {
    if (this.active) {
      this._layer.ctx.save()
      this._layer.ctx.fillStyle = this.color
      this._layer.ctx.fillRect(this.x, this.y, this.w, this.h)
      this._layer.ctx.restore()
      // this._layer.ctx.drawImage(this.sprites.block, block.x, block.y);
    }
  }
}
