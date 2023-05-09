export const hsl = (h: number, s: number, l: number) => `hsl(${h},${s}%,${l}%)`

export function getRandomColor() {
  return hsl(Math.floor(Math.random() * 360), 100, 50)
}
