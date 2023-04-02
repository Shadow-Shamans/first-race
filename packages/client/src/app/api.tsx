import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TTestData } from './types'

const PORT = process.env.__SERVER_PORT__ || 3001

export const testDataApi = createApi({
  reducerPath: 'testDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:${PORT}` }),
  endpoints: builder => ({
    getTestData: builder.query<TTestData, string>({
      query: () => `/`,
    }),
  }),
})

export const { useGetTestDataQuery } = testDataApi
