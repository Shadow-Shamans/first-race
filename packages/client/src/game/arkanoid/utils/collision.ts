type Box = {
  x: number
  y: number
  w: number
  h: number
}

export const boxCollision = (boxA: Box, boxB: Box) => {
  if (boxA.x + boxA.w >= boxB.x && boxA.x <= boxB.w) {
    return true
  }

  if (boxA.y + boxA.h >= boxB.y && boxA.y <= boxB.h) {
    return true
  }

  return false
}
