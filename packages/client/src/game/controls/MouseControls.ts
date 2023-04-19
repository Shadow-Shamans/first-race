import { TILE_SIZE } from '../constants'
import type { TPosition, IMouseEvent } from '../types'

export class MouseControls {
  private static _instance: MouseControls = new MouseControls()
  private _position: TPosition
  private _draggable: boolean

  constructor() {
    if (MouseControls._instance) {
      this.errorHandler(
        'You cannot create instances of this class. You can only use static methods of this class.'
      )
    }

    this._position = {
      x: 0,
      y: 0,
    }

    this._draggable = false
  }

  errorHandler(msg: string) {
    msg = msg ? `MouseControlsError: ${msg}` : 'MouseControlsError'
    throw Error(msg)
  }

  static isOveElement = (elementX: number, elementY: number) => {
    const { x, y } = this._instance._position

    return (
      x > elementX &&
      x < elementX + TILE_SIZE &&
      y > elementY &&
      y < elementY + TILE_SIZE
    )
  }

  static get instances() {
    return this._instance
  }

  static mouseMoveHandler = (e: unknown) => {
    const { layerX, layerY } = e as IMouseEvent

    this._instance._position = {
      x: layerX,
      y: layerY,
    }
  }

  static mouseDownHandler = (e: MouseEvent) => {
    this._instance._draggable = true
    console.log('mouseDownHandler', this._instance, e)
  }

  static mouseUpHandler = (e: MouseEvent) => {
    this._instance._draggable = false
    console.log('mouseUpHandler', this._instance, e)
  }

  static mouseOutHandler = (e: MouseEvent) => {
    this._instance._draggable = false
    console.log('mouseOutHandler', this._instance, e)
  }

  static get position() {
    return this._instance._position
  }

  static get draggable() {
    return this._instance._position
  }
}
