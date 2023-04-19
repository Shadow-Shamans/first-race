import { TILE_SIZE } from '../constants'
import type { TDrawLayerFunc, TPosition } from '../types'

export const drawGrid: TDrawLayerFunc = opt => {
  const { ctx, position } = opt
  const xPos = position.x
  const yPos = position.y
  const baseColor = 'red'
  ctx.lineWidth = 1

  // tile
  ctx.strokeStyle = baseColor
  ctx.strokeRect(xPos, yPos, TILE_SIZE, TILE_SIZE)
}
