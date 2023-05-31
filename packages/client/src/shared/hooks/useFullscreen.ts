import { useState } from 'react'

type RequestFullscreen = typeof document.documentElement.requestFullscreen
type ExitFullscreen = typeof document.exitFullscreen

declare global {
  interface HTMLElement {
    webkitRequestFullscreen: RequestFullscreen
    msRequestFullscreen: RequestFullscreen
  }

  interface Document {
    webkitExitFullscreen: ExitFullscreen
    msExitFullscreen: ExitFullscreen
  }
}

const request = (element: HTMLElement | null) => {
  if (!element) return

  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const exit = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

export const useFullscreen = (element: HTMLElement): [boolean, () => void] => {
  const [enabled, setFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const shouldEnable = !enabled
    setFullscreen(shouldEnable)
    shouldEnable ? request(element) : exit()
  }

  return [enabled, toggleFullscreen]
}

export default useFullscreen
