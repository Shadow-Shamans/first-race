export class Loop {
  deltaTime = 0
  lastUpdate = 0
  maxInterval = 40

  constructor(
    private _update: (correction: number) => void,
    private _display: () => void
  ) {
    this.deltaTime = 0
    this.lastUpdate = 0
    this.maxInterval = 40

    requestAnimationFrame(stampTime => this.animate(stampTime))
  }

  animate(currentTime = 0) {
    requestAnimationFrame(stampTime => this.animate(stampTime))

    this.deltaTime = currentTime - this.lastUpdate

    if (this.deltaTime < this.maxInterval) {
      this._update(this.deltaTime / 1000)
      this._display()
    }

    this.lastUpdate = currentTime
  }
}
