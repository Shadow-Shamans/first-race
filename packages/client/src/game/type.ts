export type Position = {
  x: number
  y: number
}

export type DrawLayerFunc = (options: {
  ctx: CanvasRenderingContext2D
  position: Position
}) => void

export type DrawLayer = (options: {
  ctx: CanvasRenderingContext2D
  columnsNumber: number
  rowNumbers: number
  listDrawFunc: DrawLayerFunc[]
}) => void
