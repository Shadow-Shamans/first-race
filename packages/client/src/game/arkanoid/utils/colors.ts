export const hsl = (h: number, s: number, l: number) => `hsl(${h},${s}%,${l}%)`

export function getRandomColor() {
  return hsl(Math.floor(Math.random() * 360), 100, 50)
}

export function centerRadialGradient(
  ctx: CanvasRenderingContext2D,
  opt: {
    w: number
    h: number
    color1: string
    color2: string
  }
) {
  const { w, h, color1, color2 } = opt

  const middleX = w / 2
  const middleY = h / 2
  const radius = middleX
  const grd = ctx.createRadialGradient(
    middleX,
    middleY,
    radius * 0.5,
    middleX,
    middleY,
    radius
  )
  grd.addColorStop(0, color1)
  grd.addColorStop(1, color2)

  ctx.fillStyle = grd
}
