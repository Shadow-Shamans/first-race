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

interface IDeleteTopic {
  id: string
}

export interface IForumItem {
  createdAt: string
  description: string
  id: string
  messageCount: number
  title: string
  userId: number
}

export const forumAPI = createApi({
  reducerPath: 'forumAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/topics',
  }),

  endpoints: build => ({
    createTopic: build.mutation<{ data: IForumItem }, ICreateTopic>({
      query: data => ({
        url: '/create',
        method: 'POST',
        body: { data },
      }),
    }),

    getTopics: build.query<{ data: IForumItem[] }, void>({
      query: () => ({
        url: `/all`,
      }),
    }),

    updateTopic: build.mutation<{ data: IForumItem }, IUpdateTopic>({
      query: data => ({
        url: `/${data.id}`,
        method: 'PUT',
        body: { data },
      }),
    }),

    deleteTopic: build.mutation<{ data: IForumItem }, IDeleteTopic>({
      query: data => ({
        url: `/${data.id}`,
        method: 'DELETE',
        body: { id: data.id },
      }),
    }),
  }),
})

export const {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
  useLazyGetTopicsQuery,
} = forumAPI
