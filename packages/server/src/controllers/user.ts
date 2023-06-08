import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/constants/api'
import { findUserWithRoleService } from '../services/user'

export const findUserById = async (req: Request, res: Response) => {
  console.log(req, '=> req in findUserById')
  try {
    const user = await findUserWithRoleService(
      req.headers.cookie,
      res.locals.user,
      res.locals.role // TODO мб выпилить
    )
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
  }
}
