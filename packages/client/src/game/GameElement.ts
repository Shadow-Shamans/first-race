import bg from '@/assets/grass.png'
import styles from './Game.css'
import { CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE } from './constants'

const style = `<style>${styles}</style>`

export class GameElement extends HTMLElement {
  private _root: ShadowRoot
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _CANVAS_WIDTH: number
  private _CANVAS_HEIGHT: number
  private _bg: HTMLImageElement
  private _running: boolean
  private _tileSize = TILE_SIZE
  private _gridRow = 10
  private _gridColl = 5
  private _score = 0
  private _coins = 0

  xPos: number
  ref: unknown

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) {
      this.errorHandler('shadowRoot not exist')
    }

    this._root = this.shadowRoot as ShadowRoot
    this._root.innerHTML = style
    this._canvas = document.createElement('canvas')
    this._CANVAS_WIDTH = this._canvas.width = CANVAS_WIDTH
    this._CANVAS_HEIGHT = this._canvas.height = CANVAS_HEIGHT
    this._root.appendChild(this._canvas)
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._bg = new Image()
    this._bg.src = bg
    this._running = false
    this.xPos = 0
  }

  static get observedAttributes() {
    return ['start', 'pause', 'end']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name' && oldValue !== newValue) {
      console.log({ name, oldValue, newValue })
    }
  }

  connectedCallback() {
    console.log('mount')
    this._gameLoop()
  }

  disconnectedCallback() {
    this.pause()
    console.log('unmount')
  }

  errorHandler(msg: string) {
    msg = msg || 'Error: Game'
    throw Error(msg)
  }

  private _gameLoop() {
    if (this._running) {
      this._update()
    }

    this._render()

    requestAnimationFrame(() => this._gameLoop())
  }

  private _clear() {
    this._ctx.clearRect(0, 0, this._CANVAS_WIDTH, this._CANVAS_HEIGHT)
  }

  private _update() {
    console.log('_update game')
    this._clear()
    this.xPos += 1
  }

  private _render() {
    console.log('_render game')

    const tileWidth = this._tileSize
    const tileHeight = this._tileSize
    this._clear()
    this._ctx.fillRect(0, 0, this._CANVAS_WIDTH, this._CANVAS_HEIGHT)
    this._ctx.fillStyle = 'green'

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
  }

  public start = () => {
    console.log('start game')
    this._running = true
  }

  public pause = () => {
    console.log('pause game')
    this._running = false
  }

  public finish = () => {
    console.log('finish game')
    this._running = false
    this.xPos = 0
    this._clear()
  }

  public get score() {
    return this._score
  }

  public set score(value: number) {
    this._score = value
  }

  public get coins() {
    return this._coins
  }

  public set coins(value: number) {
    this._coins = value
  }
}

export default customElements.define('sfr-game', GameElement)
