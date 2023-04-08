export function formatTime(time: number) {
  const seconds = time % 60
  const minutes = Math.floor(time / 60)

  return ('' + minutes).padStart(2, '0') + ':' + ('' + seconds).padStart(2, '0')
}
