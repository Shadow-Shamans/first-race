import express from 'express'
import { getAllComments } from '../controllers/comments'

export const commentsRouter = express.Router()

const COMMENTS = 'comments'

commentsRouter.get(`/${COMMENTS}`, getAllComments)
