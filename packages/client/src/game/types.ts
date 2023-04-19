export type TPosition = {
  x: number
  y: number
}

export type TDrawLayerFunc = (options: {
  ctx: CanvasRenderingContext2D
  position: TPosition
}) => void

export type TDrawLayer = (options: {
  ctx: CanvasRenderingContext2D
  columnsNumber: number
  rowNumbers: number
  listDrawFunc: TDrawLayerFunc[]
}) => void

export interface IMouseEvent extends MouseEvent {
  layerX: number
  layerY: number
}
