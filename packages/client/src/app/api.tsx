import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TTestData } from './types'

// console.log(process.env)
export const testDataApi = createApi({
  reducerPath: 'testDataApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:${process.env.SERVER_PORT}`,
    baseUrl: `http://localhost/3001`,
  }),
  endpoints: builder => ({
    getTestData: builder.query<TTestData, string>({
      query: () => `/`,
    }),
  }),
})

export const { useGetTestDataQuery } = testDataApi
