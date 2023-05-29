import express from 'express'
import {
  getAllTopics,
  createNewTopic,
  deleteTopic,
  getOneTopic,
  updateTopic,
} from '../controllers/forum'

export const forumRouter = express.Router()

const TOPICS = 'topics'

forumRouter.get(`/${TOPICS}`, getAllTopics)

forumRouter.get(`/${TOPICS}/:id`, getOneTopic)

forumRouter.post(`/${TOPICS}`, createNewTopic)

forumRouter.put(`/${TOPICS}`, updateTopic)

forumRouter.delete(`/${TOPICS}:id`, deleteTopic)
