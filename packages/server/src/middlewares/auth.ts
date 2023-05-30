import type { NextFunction, Request, Response } from 'express'
import { ApiError, instanceOfApiError } from '../utils/types/api'
import { INTERNAL_SERVER_ERROR } from '../utils/constants/api'
import { getUser } from '../utils/yandex/user'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userOrErr = await getUser(req.headers.cookie)
    console.log(userOrErr, '=> userOrErr')
    if (instanceOfApiError(userOrErr)) {
      const { status, reason } = userOrErr as ApiError
      return res.status(status).json({ reason })
    }
    res.locals.user = userOrErr
    return next()
  } catch (err) {
    return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
  }
}
