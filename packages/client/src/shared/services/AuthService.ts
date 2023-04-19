import { IUser } from '@/features/User/userSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface ISignUp {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface ISignIn {
  email: string
  password: string
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json; charset=utf-8')

      return headers
    },
    credentials: 'include',
  }),
  endpoints: build => ({
    getUserData: build.query<IUser, void>({
      query: () => ({
        url: `/auth/user`,
      }),
    }),
    signin: build.mutation<void, ISignIn>({
      query: data => ({
        url: `/auth/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: build.mutation<{ id: number }, ISignUp>({
      query: data => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
    }),
    updateUserProfile: build.mutation({
      query: () => ({
        url: `/user/profile`,
        method: 'PUT',
      }),
    }),
    updateUserPassword: build.mutation({
      query: () => ({
        url: `/user/password`,
        method: 'PUT',
      }),
    }),
    changeUserAvatar: build.mutation({
      query: () => ({
        url: `/user/profile/avatar`,
        method: 'PUT',
      }),
    }),
  }),
})

export const { useSignupMutation, useSigninMutation, useLazyGetUserDataQuery } =
  authAPI