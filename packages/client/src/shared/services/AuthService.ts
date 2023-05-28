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

interface IUpdateUserData {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

interface IOAuth {
  code: string
  redirect_uri: string
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    prepareHeaders: headers => {
      const contentType = headers.get('Content-Type')
      if (!contentType) {
        headers.set('Content-Type', 'application/json; charset=utf-8')
      }

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
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
    }),
    updateUserProfile: build.mutation<IUpdateUserData, IUpdateUserData>({
      query: data => ({
        url: `/user/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateUserPassword: build.mutation({
      query: () => ({
        url: `/user/password`,
        method: 'PUT',
      }),
    }),
    changeUserAvatar: build.mutation<IUpdateUserData, FormData>({
      query: body => ({
        url: `/user/profile/avatar`,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),
    oAuthLogin: build.mutation<
      { requestId: string; error: { originalStatus?: number } },
      IOAuth
    >({
      query: data => ({
        url: `/oauth/yandex`,
        method: 'POST',
        body: data,
      }),
    }),
    getOauthData: build.query<{ service_id: string }, void>({
      query: () => ({
        url: `/oauth/yandex/service-id?redirect_uri=http%3A%2F%2Flocalhost%3A3000`,
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useSigninMutation,
  useLazyGetUserDataQuery,
  useUpdateUserProfileMutation,
  useLogoutMutation,
  useOAuthLoginMutation,
  useLazyGetOauthDataQuery,
  useChangeUserAvatarMutation,
} = authAPI
