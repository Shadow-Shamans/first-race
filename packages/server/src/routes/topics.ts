import express from 'express'
import {
  getAllTopics,
  createNewTopic,
  deleteTopic,
  getOneTopic,
  updateTopic,
} from '../controllers/topics'
// import { checkAuth } from '../middlewares/auth'

// Как скрыть ручки за авторизацией
export const topicsRouter = express.Router()

topicsRouter.get(`/all`, getAllTopics)

topicsRouter.get(`/:id`, getOneTopic)

topicsRouter.post(`/create`, createNewTopic)

topicsRouter.put(`/:id`, updateTopic)

topicsRouter.delete(`/:id`, deleteTopic)
