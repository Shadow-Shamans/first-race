import express from 'express'
import {
  getAllTopics,
  createNewTopic,
  deleteTopic,
  getOneTopic,
  updateTopic,
} from '../controllers/topics'
import {
  addNewComment,
  deleteComment,
  getAllComments,
} from '../controllers/comments'
// import { checkAuth } from '../middlewares/auth'

export const topicsRouter = express.Router()

// topics

topicsRouter.get(`/all`, getAllTopics)

topicsRouter.get(`/:id`, getOneTopic)

topicsRouter.post(`/create`, createNewTopic)

topicsRouter.put(`/:id`, updateTopic)

topicsRouter.delete(`/:id`, deleteTopic)

// comments

topicsRouter.get(`/:id/comments`, getAllComments)

topicsRouter.post(`/:id/comments`, addNewComment)

topicsRouter.delete(`/:id/comments`, deleteComment)
