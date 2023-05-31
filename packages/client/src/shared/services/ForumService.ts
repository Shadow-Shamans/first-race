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

interface ICreateComment {
  id: string // topicId or parentCommentId
  content: string
  userId: string
}

export interface IForumItem {
  createdAt: string
  description: string
  id: string
  messageCount: number
  title: string
  userId: number
}

export interface IForumComment {
  createdAt: string
  content: string
  id: string
  messageCount: number
  userId: number
  parentId: number
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

    getTopicById: build.query<{ data: IForumItem }, { id: string }>({
      query: params => ({
        url: `/${params.id}`,
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

    createComment: build.mutation<IForumComment, ICreateComment>({
      query: data => ({
        url: `/${data.id}/comments`,
        method: 'POST',
        body: { data },
      }),
    }),

    getComments: build.query<{ data: IForumComment[] }, { id: string }>({
      query: params => ({
        url: `/${params.id}/comments`,
      }),
    }),

    deleteComment: build.mutation<{ data: IForumComment }, { id: string }>({
      query: data => ({
        url: `/${data.id}/comments`,
        method: 'DELETE',
        body: { id: data.id },
      }),
    }),
  }),
})

export const {
  useCreateTopicMutation,
  useCreateCommentMutation,
  useDeleteTopicMutation,
  useDeleteCommentMutation,
  useUpdateTopicMutation,
  useLazyGetTopicsQuery,
  useLazyGetTopicByIdQuery,
  useLazyGetCommentsQuery,
} = forumAPI
