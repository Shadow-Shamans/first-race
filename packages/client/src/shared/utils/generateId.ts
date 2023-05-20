const NUM = 36

export function generateId(): string {
  if (typeof window !== 'undefined') {
    const numbersArray = new Uint32Array(3)
    window.crypto.getRandomValues(numbersArray)
    return (
      performance.now().toString(NUM) +
      Array.from(numbersArray)
        .map(num => num.toString(NUM))
        .join('')
    ).replace(/\./g, '')
  }
  return ''
}
