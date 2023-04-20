import { TILE_SIZE } from '../constants'
import { TDrawLayer } from '../types'

export const drawLayer: TDrawLayer = opt => {
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
