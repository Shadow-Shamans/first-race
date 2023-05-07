import { useState } from 'react'

const request = (element) => {
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

const useFullscreen = (element) => {
  const [enabled, setFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const shouldEnable = !enabled
    setFullscreen(shouldEnable)
    shouldEnable ? request(element) : exit()
  }

  return [enabled, toggleFullscreen]
}


export default useFullscreen
