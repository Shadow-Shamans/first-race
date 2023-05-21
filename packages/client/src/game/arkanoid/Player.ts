import { Ball } from './Ball'
import type { Block } from './Block'
import type { KeyboardControls } from './KeyboardControls'
import type { Layer } from './Layer'
import type { MouseControls } from './MouseControls'
import type { Text } from './Text'
import type { StateScreen } from './StateScreen'
import { platformHeight, platformWidth } from './constants'
import { StateGame } from './types'

export class Player {
  blocks: Block[] = []
  options: {
    x: number
    y: number
    w: number
    h: number
    vx: number
    vy: number
    color: string
  }
  isRunning = false
  ball: Ball

  constructor(
    private _layer: Layer,
    private _mouse: MouseControls,
    private _keyboard: KeyboardControls,
    private _text: Text,
    private _stateGame: StateScreen,
    private _handleStateChangeCallback: (
      state: StateGame,
      score?: number
    ) => void
  ) {
    this.options = this._setDefaultState()
    this.ball = new Ball(this._layer, this._stateGame)
    console.log(this._mouse)
  }

  update = (correction: number) => {
    const righEdgePlatform = this.options.x + this.options.w
    const leftEdgePltatform = this.options.x
    const isLeftKey = this._keyboard.keys.KeyA || this._keyboard.keys.ArrowLeft
    const isRightKey =
      this._keyboard.keys.KeyD || this._keyboard.keys.ArrowRight

    if (isRightKey && this._layer.sW > righEdgePlatform) {
      this.options.x += this.options.vx * correction
    }

    if (isLeftKey && 0 < leftEdgePltatform) {
      this.options.x -= this.options.vx * correction
    }

    if (!this.isRunning) {
      this.ball.x = this.options.x + this.options.w / 2
    }

    if (this.isRunning) {
      this.ball.isRunning = true
      this.ball.update(correction)
      this._collaideBlocks()
      this._collaideWithPlatform()
    }

    if (this._keyboard.keys.Space && this._stateGame.state === 'isRunning') {
      this.isRunning = true
      this._text.message = 'Score: 0'
    }

    if (this._stateGame.state === 'fall' || this._stateGame.state === 'win') {
      this.isRunning = false
      this.options = this._setDefaultState()
      this.ball.setDefaultStateBall()
      this._text.clear()
    }
  }

  display = () => {
    this._layer.ctx.clearRect(0, 0, this._layer.sW, this._layer.sH)
    this._layer.ctx.fillStyle = this.options.color
    this._layer.ctx.fillRect(
      this.options.x,
      this.options.y,
      this.options.w,
      this.options.h
    )
    this.ball.display()
  }

  private _collaideBlocks = () => {
    for (const block of this.blocks) {
      if (block.active && this.ball.collide(block)) {
        this.ball.bumpBlock(block)
        this._text.addScore()
        this.ball.sounds.bump?.play()

        if (this._text.score === 3) {
          this._stateGame.state = 'win'
          this._handleStateChangeCallback('win', this._text.score)
          this._stateGame.sounds.gameWin?.play()
        }
      }
    }
  }

  _getTouchOffset = (x: number) => {
    const diff = this.options.x + this.options.w - x
    const offset = this.options.w - diff
    const result = (2 * offset) / this.options.w
    return result - 1
  }

  private _collaideWithPlatform = () => {
    if (this.ball.collide(this.options)) {
      this.ball.bumpPlatform(this)
      this.ball.sounds.bump?.play()
    }
  }

  private _setDefaultState = () => {
    this.blocks = []
    return {
      x: this._layer.sW / 2 - platformWidth / 2,
      y: this._layer.sH - platformHeight,
      w: platformWidth,
      h: platformHeight,
      vx: 700,
      vy: 0,
      color: `orange`,
    }
  }
}
