import bump from './assets/sounds/bump.mp3'
import gameOver from './assets/sounds/game-over.wav'
import gameStart from './assets/sounds/game-start.wav'
import gameMusic from './assets/sounds/game-lavel-music.wav'
import gameWin from './assets/sounds/game-win.wav'
import ball from './assets/ball.png'
import block from './assets/block.png'
import platform from './assets/platform.png'
import background from './assets/background.png'

export const KeysPlayer = [`KeyA`, `KeyW`, `KeyS`, `KeyD`, `Space`, `Enter`]

export const platformHeight = 32
export const platformWidth = 224
export const ballRadius = 16
export const defaultBlockWidth = 128
export const defaultBlockHeight = 32
export const blockGap = 8
export const xBlockArea = defaultBlockWidth + blockGap
export const yBlockArea = defaultBlockHeight + blockGap

export const assets = {
  bump,
  ball,
  block,
  platform,
  background,
  gameOver,
  gameWin,
  gameStart,
  gameMusic,
}

export type AssetKeysType = keyof typeof assets
