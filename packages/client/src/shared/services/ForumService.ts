import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface ICreateTopic {
  title: string
  description: string
  userId: string
}

interface IUpdateTopic {
  title: string
  description: string
  id: string
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

    updateTopic: build.mutation<void, IUpdateTopic>({
      query: data => ({
        url: '/topics',
        method: 'PUT',
        body: { data },
      }),
    }),

    deleteTopic: build.mutation<void, { id: string }>({
      query: id => ({
        url: '/topics',
        method: 'DELETE',
        body: id,
      }),
    }),
  }),
})

export const {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useLazyGetTopicsQuery,
} = forumAPI
