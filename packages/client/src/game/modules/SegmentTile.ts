import { TILE_SIZE } from '@/game'
import { MouseControls } from '../controls'
import type { TPosition } from '../types'

interface ISegmentOptions {
  position: TPosition
  ctx: CanvasRenderingContext2D
}

export class SegmentTile {
  position: TPosition
  tileSize: number
  color: string
  occupied: boolean
  _ctx: CanvasRenderingContext2D

  constructor(opt: ISegmentOptions) {
    this.position = opt.position
    this.tileSize = TILE_SIZE
    this.color = 'rgba(255, 255, 255, 0.15)'
    this.occupied = false
    this._ctx = opt.ctx
  }

  draw() {
    this._ctx.fillStyle = this.color
    this._ctx.fillRect(
      this.position.x,
      this.position.y,
      this.tileSize,
      this.tileSize
    )
    this._ctx.fill()
  }

  update() {
    this.draw()
    const { x, y } = this.position

    if (MouseControls.isOveElement(x, y)) {
      console.log('hover Segment')
      this.color = 'red'
    } else {
      this.color = 'rgba(255, 255, 255, 0.15)'
    }
  }
}
