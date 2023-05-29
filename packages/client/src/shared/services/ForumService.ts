import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface ICreateTopic {
  title: string
  description: string
  userId: string
}

export interface IForumItem {
  createdAt: string
  description: string
  id: string
  messageCount: number
  title: string
  updatedAt: string
  userId: number
}

export const forumAPI = createApi({
  reducerPath: 'forumAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/forum',
  }),

  endpoints: build => ({
    createTopic: build.mutation<void, ICreateTopic>({
      query: data => ({
        url: '/topics',
        method: 'POST',
        body: { data },
      }),
    }),

    getTopics: build.query<{ data: IForumItem[] }, void>({
      query: () => ({
        url: `/topics`,
      }),
    }),
  }),
})

export const { useCreateTopicMutation, useLazyGetTopicsQuery } = forumAPI
