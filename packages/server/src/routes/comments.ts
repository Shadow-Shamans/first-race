import express from 'express'
import { getAllComments } from '../controllers/comments'

export const commentsRouter = express.Router()

commentsRouter.get(`/:id`, getAllComments)

commentsRouter.get(`/create`, getAllComments)
