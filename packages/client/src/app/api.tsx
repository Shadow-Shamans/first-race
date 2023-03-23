import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TestData } from './types'

export const testDataApi = createApi({
  reducerPath: 'testDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:${__SERVER_PORT__}` }),
  endpoints: builder => ({
    getTestData: builder.query<TestData, string>({
      query: () => `/`,
    }),
  }),
})

export const { useGetTestDataQuery } = testDataApi
