import express from 'express'
import { getAllComments } from '../controllers/comments'
import { COMMENTS_URL } from '../utils/constants/api'

export const commentsRouter = express.Router()

commentsRouter.get(`/:id/${COMMENTS_URL}`, getAllComments)
