import type * as Yup from 'yup'
import type { NextFunction, Request, Response } from 'express'
import type { ValidationError } from 'sequelize'

export const validateRequest =
  (schema: Yup.ObjectSchema<Yup.AnyObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        params: req.params,
        query: req.query,
        body: req.body,
      })
      return next()
    } catch (err) {
      const reason = (err as ValidationError).message
      return res.status(400).json({ reason })
    }
  }
