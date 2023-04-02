import { TILE_SIZE } from '@/game'
import type { Position } from './types'

export class SegmentTile {
  position: Position
  tileSize: number
  color: string
  occupied: boolean

  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position
    this.tileSize = TILE_SIZE
    this.color = 'rgba(255, 255, 255, 0.15)'
    this.occupied = false
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.size, this.size)
  }

  update(mouse: Position) {
    this.draw()

    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = 'white'
    } else this.color = 'rgba(255, 255, 255, 0.15)'
  }
}
