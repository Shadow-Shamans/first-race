import { ApiError } from '../types/api'
import { IUser } from '../types/user'

export const checkResponse = (res: Response): Promise<IUser | ApiError> => {
  const data = res.json()
  if (res.ok) {
    return data
  }
  return data.then(err => {
    return { status: res.status, reason: err?.reason }
  })
}
