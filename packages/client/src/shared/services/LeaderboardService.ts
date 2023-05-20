import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

type TTeam = 'shamans'

type TRating = 'score'

export interface IScoreData {
  userId: number
  score: number
  username: string
}

interface IScore {
  data: IScoreData
  ratingFieldName: TRating
  teamName: TTeam
}

interface ILeaderboardRequest {
  ratingFieldName: TRating
  cursor: number
  limit: number
}

export interface ILeaderboardResponse {
  data: IScoreData
}

export const leaderboardAPI = createApi({
  reducerPath: 'leaderboardAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/leaderboard',

    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json; charset=utf-8')

      return headers
    },

    credentials: 'include',
  }),

  endpoints: build => ({
    addScore: build.mutation<IScore, void>({
      query: data => ({
        url: '',
        method: 'POST',
        body: { data, teamName: 'shamans' },
      }),
    }),

    getLeaderboard: build.mutation<ILeaderboardResponse[], ILeaderboardRequest>(
      {
        query: data => ({
          url: '/shamans',
          method: 'POST',
          body: data,
        }),
      }
    ),
  }),
})

export const { useAddScoreMutation, useGetLeaderboardMutation } = leaderboardAPI
