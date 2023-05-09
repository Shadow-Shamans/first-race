import { Position } from './types'

export class MouseControls {
  isPressed = false
  isDown = false
  isUp = false
  position: Position = { x: null, y: null }

  constructor(private _container: HTMLElement) {
    this.mount()
  }

  mount = () => {
    this._container.addEventListener('mouseup', this._changeState)
    this._container.addEventListener('mousedown', this._changeState)
    this._container.addEventListener('mousemove', this._changeState)
    this._container.addEventListener('wheel', this._changeState)
    this._container.addEventListener('mouseleave', this._changeState)
    this._container.addEventListener('contextmenu', this._changeState)
  }

  unmount = () => {
    this._container.removeEventListener('mouseup', this._changeState)
    this._container.removeEventListener('mousedown', this._changeState)
    this._container.removeEventListener('mousemove', this._changeState)
    this._container.removeEventListener('wheel', this._changeState)
    this._container.removeEventListener('mouseleave', this._changeState)
    this._container.removeEventListener('contextmenu', this._changeState)
  }

  private _changeState = (e: MouseEvent) => {
    const rect = this._container.getBoundingClientRect()

    this.position.x = e.clientX - rect.left
    this.position.y = e.clientY - rect.top

    if (e.type === 'mousedown') {
      this.isPressed = true
      this.isDown = true
      this.isUp = false
    } else if (e.type === 'mouseup' || e.type === 'mouseleave') {
      this.isPressed = false
      this.isDown = false
      this.isUp = true
    } else if (e.type === 'contextmenu' || e.type === 'wheel') {
      e.preventDefault()
    }
  }

  update = () => {
    this.isDown = false
    this.isUp = false
  }
}
