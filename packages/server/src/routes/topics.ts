import express from 'express'
import {
  getAllTopics,
  createNewTopic,
  deleteTopic,
  getOneTopic,
  updateTopic,
} from '../controllers/topics'
import { checkAuth } from '../middlewares/auth'

export const topicsRouter = express.Router()

topicsRouter.get(`/all`, getAllTopics)

topicsRouter.get(`/:id`, checkAuth, getOneTopic)

topicsRouter.post(`/create`, createNewTopic)

topicsRouter.put(`/:id`, checkAuth, updateTopic)

topicsRouter.delete(`/:id`, checkAuth, deleteTopic)
