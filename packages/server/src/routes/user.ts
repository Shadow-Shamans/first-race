import express from 'express'
import { checkAuth } from '../middlewares/auth'
import { findUserById } from '../controllers/user'

export const userRouter = express.Router()

userRouter.get(`/`, checkAuth, findUserById)
