import { TILE_SIZE } from '../constants'
import type { DrawLayerFunc, Position } from '../type'

interface IOptions {
  ctx: CanvasRenderingContext2D
  position: Position
}

export const drawGrid: DrawLayerFunc = (opt: IOptions) => {
  const { ctx, position } = opt
  const xPos = position.x
  const yPos = position.y
  const baseColor = 'red'
  ctx.lineWidth = 1

  // tile
  ctx.strokeStyle = baseColor
  ctx.strokeRect(xPos, yPos, TILE_SIZE, TILE_SIZE)
}
