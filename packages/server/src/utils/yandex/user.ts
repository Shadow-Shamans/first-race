import fetch from 'cross-fetch'
import { AUTH_API_URL, AuthApiPaths, YA_API_URL } from '../constants/api'
import { ApiError } from '../types/api'
import { IUser } from '../types/user'
import { checkResponse } from './helpers'

export const getUser = async (cookies?: string): Promise<IUser | ApiError> => {
  const res = await fetch(
    `${process.env.BASE_URL}${YA_API_URL}${AUTH_API_URL}${AuthApiPaths.USER}`,
    {
      credentials: 'include',
      headers: {
        cookie: cookies || '',
      },
    }
  )
  return checkResponse(res)
}
