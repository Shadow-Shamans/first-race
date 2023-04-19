import type { Position } from '../type'

export class MouseControls {
  private static _instance: MouseControls = new MouseControls()
  position: Position
  draggable: boolean

  constructor() {
    if (MouseControls._instance) {
      this.errorHandler(
        'You cannot create instances of this class. You can only use static methods of this class.'
      )
    }

    this.position = {
      x: 0,
      y: 0,
    }

    this.draggable = false
  }

  errorHandler(msg: string) {
    msg = msg ? `MouseControlsError: ${msg}` : 'MouseControlsError'
    throw Error(msg)
  }

  static get instances() {
    return this._instance
  }

  static mouseMoveHandler = (e: MouseEvent) => {
    this._instance.position = {
      x: e.clientX,
      y: e.clientY,
    }
  }

  static mouseDownHandler = (e: MouseEvent) => {
    this._instance.draggable = true
    console.log('mouseDownHandler', this._instance, e)
  }

  static mouseUpHandler = (e: MouseEvent) => {
    this._instance.draggable = false
    console.log('mouseUpHandler', this._instance, e)
  }

  static mouseOutHandler = (e: MouseEvent) => {
    this._instance.draggable = false
    console.log('mouseOutHandler', this._instance, e)
  }
}
