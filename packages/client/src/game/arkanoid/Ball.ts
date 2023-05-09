import { getRandomNumber } from './utils'
import { Block } from './Block'
import { Layer } from './Layer'
import { StateScreen } from './StateScreen'
import { platformHeight, ballRadius, assets } from './constants'

export type ElemGame = {
  x: number
  y: number
  w: number
  h: number
}

export class Ball {
  x: number
  y: number
  dx = 0
  dy = 0
  r: number = ballRadius
  d: number = ballRadius * 2
  w = 20
  h = 20
  speed = 5
  color = 'green'
  isRunning = false
  sounds: {
    bump: HTMLAudioElement | null
    gameOver: HTMLAudioElement | null
  }

  constructor(private _layer: Layer, private _stateGame: StateScreen) {
    this.x = this._layer.sW / 2
    this.y = this._layer.sH - platformHeight - this.r
    this.sounds = {
      bump: new Audio(assets.bump),
      gameOver: new Audio(assets.gameOver),
    }
    this.dy = -this.speed
    this.dx = getRandomNumber(-this.speed, this.speed)
  }

  update = (correction: number) => {
    if (this.dy) {
      this.y += this.dy + this.speed * correction
    }
    if (this.dx) {
      this.x += this.dx + this.speed * correction
    }
    this._collideWorldBounds()
  }

  display = () => {
    const ctx = this._layer.ctx
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
  }

  collide(element: ElemGame) {
    const x = this.x + this.dx
    const y = this.y + this.dy

    if (
      x + this.w > element.x &&
      x < element.x + element.w &&
      y + this.h > element.y &&
      y < element.y + element.h
    ) {
      return true
    }
    return false
  }

  bumpPlatform = (platform: ElemGame) => {
    if (platform.x) {
      this.x += platform.x
    }

    if (this.dy > 0) {
      this.dy = -this.speed
      // let touchX = this.x + this.w / 2
      this.dx = this.speed * -1 //platform.getTouchOffset(touchX);
    }
  }

  bumpBlock = (block: Block) => {
    this.dy *= -1
    block.active = false
  }

  private _collideWorldBounds() {
    const x = this.x + this.dx
    const y = this.y + this.dy

    const ballLeft = x
    const ballRight = ballLeft + this.w
    const ballTop = y
    const ballBottom = ballTop + this.h

    const worldLeft = 0
    const worldRight = this._layer.sW
    const worldTop = 0
    const worldBottom = this._layer.sH

    if (ballLeft < worldLeft) {
      this.x = 0
      this.dx = this.speed
      this.sounds.bump?.play()
    } else if (ballRight > worldRight) {
      this.x = worldRight - this.w
      this.dx = -this.speed
      this.sounds.bump?.play()
    } else if (ballTop < worldTop) {
      this.y = 0
      this.dy = this.speed
      this.sounds.bump?.play()
    } else if (ballBottom > worldBottom) {
      this._stateGame.state = 'fall'
      this.sounds.gameOver?.play()
    }
  }
}
