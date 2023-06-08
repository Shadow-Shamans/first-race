import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IForumComment, IForumItem } from '@/shared/services/ForumService'

interface IForum {
  topic: IForumItem
  messages: IForumComment[]
}

const initialState: IForum = {
  topic: {
    createdAt: '',
    description: '',
    id: '',
    messageCount: 0,
    title: '',
    userId: 0,
  },
  messages: [],
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<IForumItem>) => {
      state.topic = action.payload
    },
    setMessages: (state, action: PayloadAction<IForumComment[]>) => {
      state.messages = action.payload
    },
  },
})

export const { setTopic, setMessages } = forumSlice.actions
