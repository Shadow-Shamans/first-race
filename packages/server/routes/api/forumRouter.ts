import express from 'express'
import {
  createNewTopic,
  getAllTopics,
  getOneTopic,
  updateOneTopic,
  deleteOneTopic,
} from '../../controllers/forumController'

export const forumRouter = express.Router()

const TOPICS = 'topics'

forumRouter.get(`/${TOPICS}`, getAllTopics)

forumRouter.get(`/${TOPICS}/:id`, getOneTopic)

forumRouter.post(`/${TOPICS}`, createNewTopic)

forumRouter.patch(`/${TOPICS}/:id`, updateOneTopic)

forumRouter.delete(`/${TOPICS}/:id`, deleteOneTopic)
