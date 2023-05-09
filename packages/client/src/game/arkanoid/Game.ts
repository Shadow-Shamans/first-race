import { Bg } from './Bg'
import { KeyboardControls } from './KeyboardControls'
import { Layer } from './Layer'
import { Loop } from './Loop'
import { MouseControls } from './MouseControls'
import { Player } from './Player'
import { KeysPlayer, xBlockArea, yBlockArea, assets } from './constants'
import { Text } from './Text'
import { Block } from './Block'
import { StateScreen } from './StateScreen'

export class Game {
  player: Player
  bg: Bg
  text: Text
  mouse: MouseControls
  loopControls: Loop
  keyboard: KeyboardControls
  blocks: Block[] = []
  rows = 3
  cols = 7
  isRunning = false
  isLoading = false
  stateScreen: StateScreen
  sprites: {
    background: HTMLImageElement | null
    ball: HTMLImageElement | null
    platform: HTMLImageElement | null
    block: HTMLImageElement | null
  }
  sounds: {
    bump: HTMLAudioElement | null
  }

  private _resourceLoaaded = 0
  private _resourceCount = 0

  constructor(private _container: HTMLElement) {
    const bgLayer = new Layer(this._container, 1)
    const textLayer = new Layer(this._container, 2)
    const playerLayer = new Layer(this._container, 3)
    const layerScreen = new Layer(this._container, 4)
    this.mouse = new MouseControls(this._container)
    this.keyboard = new KeyboardControls(KeysPlayer)
    this.text = new Text(textLayer)
    this.stateScreen = new StateScreen(layerScreen)
    this.player = new Player(
      playerLayer,
      this.mouse,
      this.keyboard,
      this.blocks,
      this.text,
      this.stateScreen
    )
    this.bg = new Bg(bgLayer)
    this.sounds = {
      bump: null,
    }
    this.sprites = {
      background: null,
      ball: null,
      platform: null,
      block: null,
    }

    this._resourceCount =
      Object.keys(this.sounds).length + Object.keys(this.sprites).length

    const gapForLeftAndRightEdge = (playerLayer.sW - xBlockArea * this.cols) / 2
    const gapForTop = yBlockArea + 10
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const xPos = xBlockArea * col + gapForLeftAndRightEdge
        const yPos = yBlockArea * row + gapForTop
        this.blocks.push(new Block(playerLayer, xPos, yPos))
      }
    }

    this._prealoadAssets()
    this.loopControls = new Loop(this.update, this.display)
  }

  private _prealoadAssets() {
    this.isLoading = true
    for (const key in this.sounds) {
      // @ts-ignore: Unreachable code error
      this.sounds[key] = new Audio(assets[key])
      // @ts-ignore: Unreachable code error
      this.sounds[key].addEventListener(
        'canplaythrough',
        this._handleLoadComplete,
        { once: true }
      )
    }

    for (const key in this.sprites) {
      // @ts-ignore: Unreachable code error
      this.sprites[key] = new Image()
      // @ts-ignore: Unreachable code error
      this.sprites[key].src = assets[key]
      // @ts-ignore: Unreachable code error
      this.sprites[key].addEventListener('load', this._handleLoadComplete)
    }
  }

  private _handleLoadComplete = () => {
    this._resourceLoaaded += 1
    if (this._resourceLoaaded >= this._resourceCount) {
      this.isLoading = false
    }
  }

  update = (correction: number) => {
    this.player.update(correction)
    this.mouse.update()

    if (this.keyboard.keys.Enter && this.stateScreen.state === 'start') {
      this.stateScreen.state = 'isRunning'
      this.stateScreen.sounds.gameStart?.play()
    }
  }

  display = () => {
    this.player.display()
    this.text.display()
    this.blocks.forEach(block => {
      block.display()
    })

    this.bg.display()

    this.stateScreen.display()
  }
}
