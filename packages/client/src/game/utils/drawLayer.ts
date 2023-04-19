import { TILE_SIZE } from '../constants'
import { DrawLayer } from '../type'

export const drawLayer: DrawLayer = opt => {
  const { columnsNumber, rowNumbers, ctx, listDrawFunc } = opt

  listDrawFunc.forEach(drawFunc => {
    for (let column = 0; column < columnsNumber; column++) {
      for (let row = 0; row < rowNumbers; row++) {
        const position = {
          x: column * TILE_SIZE,
          y: row * TILE_SIZE,
        }

        drawFunc({ ctx, position })
      }
    }
  })
}
