import { TILE_SIZE } from '@/game'
import type { Position } from '../types'

export class SegmentTile {
  position: Position
  tileSize: number
  color: string
  occupied: boolean
  _ctx: CanvasRenderingContext2D

  constructor({ position = { x: 0, y: 0 } }, ctx: CanvasRenderingContext2D) {
    this.position = position
    this.tileSize = TILE_SIZE
    this.color = 'rgba(255, 255, 255, 0.15)'
    this.occupied = false
    this._ctx = ctx
  }

  draw() {
    this._ctx.fillStyle = this.color
    this._ctx.fillRect(
      this.position.x,
      this.position.y,
      this.tileSize,
      this.tileSize
    )
  }

  update(mouse: Position) {
    this.draw()

    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.tileSize &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.tileSize
    ) {
      this.color = 'white'
    } else this.color = 'rgba(255, 255, 255, 0.15)'
  }
}
