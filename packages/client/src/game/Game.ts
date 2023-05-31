import bg from '@/assets/grass.png'
import { TILE_SIZE } from './constants'
import { SegmentTile } from './modules'
import { drawLayer, drawGrid } from './utils'
import useFullscreen from '../shared/hooks/useFullscreen'

interface IGameOptions {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

/**
 * Основной класс игры.
 *
 *
 *
 *
 */
export class Game {
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _bg: HTMLImageElement
  private _tileSize = TILE_SIZE
  private _score = 0
  private _coins = 0
  private _running: boolean
  private _numberCollumns: number
  private _numberRows: number
  private _segment: SegmentTile[]

  xPos: number
  ref: unknown

  constructor(opt: IGameOptions) {
    console.log('GAME')
    this._canvas = opt.canvas
    this._ctx = opt.ctx

    this._running = false

    this._bg = new Image()
    this._bg.src = bg
    this.xPos = 0

    this._numberCollumns = this._canvas.width / TILE_SIZE
    this._numberRows = this._canvas.height / TILE_SIZE

    // todo: remove temporary for check SegmentTile
    this._segment = [
      new SegmentTile({ position: { x: 384, y: 384 }, ctx: this._ctx }),
    ]
  }

  private _gameLoop() {
    if (this._running) {
      this._update()
    }

    this._render()

    requestAnimationFrame(() => this._gameLoop())
  }

  private _clear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  private _update() {
    console.log('_update game')
    this._clear()
    this.xPos += 1
  }

  private _render() {
    // console.log('_render game')

    // todo: скрытая зависимость от метода GameElement._setCanvasSize
    // используется для отслеживания измеенеий window.resize
    this._numberCollumns = this._canvas.width / TILE_SIZE
    this._numberRows = this._canvas.height / TILE_SIZE

    const tileWidth = this._tileSize
    const tileHeight = this._tileSize
    this._clear()
    this._ctx.fillStyle = 'green'
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)

    this._ctx.drawImage(
      this._bg,
      0,
      0,
      tileWidth,
      tileHeight,
      this.xPos,
      0,
      tileWidth,
      tileHeight
    )

    this._ctx.fill()

    drawLayer({
      ctx: this._ctx,
      columnsNumber: this._numberCollumns,
      rowNumbers: this._numberRows,
      listDrawFunc: [drawGrid],
    })

    this._segment.forEach(segment => {
      segment.update()
    })
  }

  init = () => {
    this._gameLoop()
  }

  clearGameDataAfterUnmount = () => {
    console.log('clearGameDataAfterUnmount')
  }

  start = () => {
    console.log('start game')
    useFullscreen(this._canvas)
    this._running = true
  }

  pause = () => {
    console.log('pause game')
    this._running = false
  }

  finish = () => {
    console.log('finish game')
    this._running = false
    this.xPos = 0
    this._clear()
  }

  get score() {
    return this._score
  }

  set score(value: number) {
    this._score = value
  }

  get coins() {
    return this._coins
  }

  set coins(value: number) {
    this._coins = value
  }
}
