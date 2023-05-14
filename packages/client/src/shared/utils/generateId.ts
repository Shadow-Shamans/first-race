export function generateId(): string {
  if (typeof window !== 'undefined') {
    const numbersArray = new Uint32Array(3)
    window.crypto.getRandomValues(numbersArray)
    return (
      performance.now().toString(36) +
      Array.from(numbersArray)
        .map(num => num.toString(36))
        .join('')
    ).replace(/\./g, '')
  }
  return ''
}
