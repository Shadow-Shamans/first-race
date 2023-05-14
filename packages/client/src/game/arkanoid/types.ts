export interface Position {
  x: number | null
  y: number | null
}

export type StateGame = 'start' | 'isRunning' | 'win' | 'fall'
