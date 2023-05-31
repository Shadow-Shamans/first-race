import { RootState } from '@/store'

export const selectTopic = ({ forum }: RootState) => forum.topic

export const selectMessages = ({ forum }: RootState) => forum.messages
