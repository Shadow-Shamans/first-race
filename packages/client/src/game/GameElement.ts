import { TILE_SIZE } from './constants'
import { Game } from './Game'
import type { Game as GameType } from './Game'
import styles from './Game.css'

const style = `<style>${styles}</style>`

/**
 * Этот компонент предназначен для создания кастомного элемента
 * который будет использоваться в реакте в качестве интерфейса
 * ко всем открытым методам игры.
 * Сама игра разпологается в классе Game
 *
 */
export class GameElement extends HTMLElement {
  private _root: ShadowRoot
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _game: GameType

  ref: unknown | GameElement

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) {
      this.errorHandler('shadowRoot not exist')
    }

    this._root = this.shadowRoot as ShadowRoot
    this._root.innerHTML = style
    this._canvas = document.createElement('canvas')
    this._root.appendChild(this._canvas)
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._setCanvasSize()

    this._game = new Game({
      canvas: this._canvas,
      ctx: this._ctx,
    })
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
    this._game.init()
    window.addEventListener('resize', this._resize)
  }

  disconnectedCallback() {
    console.log('unmount')
    this._game.clearGameDataAfterUnmount()
    window.removeEventListener('resize', this._resize)
  }

  errorHandler(msg: string) {
    msg = msg || 'Error: Game'
    throw Error(msg)
  }

  private _setCanvasSize = () => {
    const numberCollumns = Math.floor(window.innerWidth / TILE_SIZE)
    const numberRows = Math.floor(window.innerHeight / TILE_SIZE)
    this._canvas.width = numberCollumns * TILE_SIZE
    this._canvas.height = numberRows * TILE_SIZE
  }

  private _resize = () => {
    this._setCanvasSize()
  }

  start() {
    this._game.start()
  }

  pause() {
    this._game.pause()
  }

  finish() {
    this._game.finish()
  }

  get score() {
    return this._game.score
  }

  set score(value: number) {
    this._game.score = value
  }

  get coins() {
    return this._game.coins
  }

  set coins(value: number) {
    this._game.coins = value
  }
}

export default customElements.define('sfr-game', GameElement)
