export class KeyboardControls {
  keys: Record<string, boolean> = {}
  private _keysList: string[] = [`KeyW`, `KeyA`, `KeyS`, `KeyD`]

  constructor(keysList?: string[]) {
    if (keysList) {
      this._keysList = keysList
    }
    this.mount()
  }

  mount = () => {
    addEventListener(`keydown`, this._changeState)
    addEventListener(`keyup`, this._changeState)
  }

  unmount = () => {
    removeEventListener(`keydown`, this._changeState)
    removeEventListener(`keyup`, this._changeState)
  }

  private _changeState = (e: KeyboardEvent) => {
    if (!this._keysList.includes(e.code)) {
      return
    }
    this.keys[e.code] = e.type === 'keydown' ? true : false
    console.log(this.keys, e.code)
  }
}
