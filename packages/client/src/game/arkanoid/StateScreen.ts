import type { StateGame } from './types'
import { Layer } from './Layer'
import { assets } from './constants'

export class StateScreen {
  state: StateGame = 'start'
  fontSize = 100
  colors: {
    xanthous: string
    dodgerBlue: string
    biceBlue: string
    raspbery: string
    magenta: string
  }
  sounds: {
    gameFail: HTMLAudioElement | null
    gameStart: HTMLAudioElement | null
    gameWin: HTMLAudioElement | null
    gameMusic: HTMLAudioElement | null
  }

  constructor(private _layer: Layer) {
    this._layer.ctx.font = `${this.fontSize}px Darumadrop One, cursive`
    this._layer.ctx.fillStyle = '#fff'
    this.colors = {
      xanthous: '#FFBC42',
      dodgerBlue: '#0496FF',
      biceBlue: '#006BA6',
      raspbery: '#D81159',
      magenta: '#8F2D56',
    }
    this.sounds = {
      gameStart: new Audio(assets.gameStart),
      gameFail: new Audio(assets.gameOver),
      gameWin: new Audio(assets.gameWin),
      gameMusic: new Audio(assets.gameMusic),
    }
  }

  display = () => {
    if (this.state === 'start') {
      this._startGame()
    }
    if (this.state === 'win') {
      this._endGameWin()
    }
    if (this.state === 'isRunning') {
      this._isRunning()
    }
    if (this.state === 'fall') {
      this._endGameFall()
    }
  }

  private _startGame() {
    const { ctx, sW, sH } = this._layer
    const middleX = sW / 2
    const middleY = sH / 2
    const radius = middleX
    const grd = ctx.createRadialGradient(
      middleX,
      middleY,
      radius * 0.5,
      middleX,
      middleY,
      radius
    )
    grd.addColorStop(0, this.colors.raspbery)
    grd.addColorStop(1, this.colors.magenta)

    ctx.fillStyle = grd

    ctx.fillRect(0, 0, sW, sH)

    ctx.save()
    const message = '🎲 Start Game 🎮'
    const sizeText = ctx.measureText(message).width
    const posXmid = sW / 2 - sizeText / 2
    const posYmid = sH / 2 - this.fontSize / 2
    ctx.fillStyle = this.colors.xanthous
    ctx.fillText(message, posXmid, posYmid)

    ctx.fillStyle = this.colors.xanthous
    ctx.fillText(message, posXmid, posYmid)
    ctx.restore()

    ctx.save()
    ctx.font = '24px Darumadrop One, cursive'
    ctx.fillStyle = '#fff'
    const messageInfo = 'press entre to start game'
    const sizeInfoText = ctx.measureText(messageInfo).width
    const posXmidInfo = sW / 2 - sizeInfoText / 2
    const posYmidInfo = sH / 2
    ctx.fillText(messageInfo, posXmidInfo, posYmidInfo + 150)
    ctx.restore()
  }

  private _endGameWin() {
    const { ctx, sW, sH } = this._layer
    ctx.fillStyle = this.colors.xanthous
    ctx.fillRect(0, 0, sW, sH)
    ctx.fillStyle = 'white'
    const message = '🥁 You Win! 🚀'
    const sizeText = ctx.measureText(message).width
    const posXmid = sW / 2 - sizeText / 2
    const posYmid = sH / 2 - this.fontSize / 2
    ctx.fillText(message, posXmid, posYmid)
  }

  private _endGameFall() {
    const { ctx, sW, sH } = this._layer
    const middleX = sW / 2
    const middleY = sH / 2
    const radius = middleX
    const grd = ctx.createRadialGradient(
      middleX,
      middleY,
      radius * 0.5,
      middleX,
      middleY,
      radius
    )
    grd.addColorStop(0, this.colors.dodgerBlue)
    grd.addColorStop(1, this.colors.biceBlue)

    ctx.fillStyle = grd

    ctx.fillRect(0, 0, sW, sH)

    ctx.save()
    const message = '💀 Game Over 💥'
    const sizeText = ctx.measureText(message).width
    const posXmid = sW / 2 - sizeText / 2
    const posYmid = sH / 2 - this.fontSize / 2
    ctx.fillStyle = this.colors.magenta
    ctx.fillText(message, posXmid, posYmid)

    ctx.fillStyle = this.colors.xanthous
    ctx.fillText(message, posXmid, posYmid)
    ctx.restore()

    ctx.save()
    ctx.font = '24px Darumadrop One, cursive'
    ctx.fillStyle = '#fff'
    const messageInfo = 'try again press entre'
    const sizeInfoText = ctx.measureText(messageInfo).width
    const posXmidInfo = sW / 2 - sizeInfoText / 2
    const posYmidInfo = sH / 2
    ctx.fillText(messageInfo, posXmidInfo, posYmidInfo + 150)
    ctx.restore()
  }

  private _isRunning() {
    const { ctx, sW, sH } = this._layer
    ctx.clearRect(0, 0, sW, sH)
  }
}
