import { RootState } from '@/store'

export const selectScore = ({ game }: RootState) => game.score
export const selectCoins = ({ game }: RootState) => game.coins
export const selectTimeNumber = ({ game }: RootState) => game.time
