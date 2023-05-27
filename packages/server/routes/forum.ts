import express from 'express'
import { getAllTopics, createNewTopic } from '../controllers/forum'

export const forumRouter = express.Router()

const TOPICS = 'topics'

forumRouter.get(`/${TOPICS}`, getAllTopics)

forumRouter.post(`/${TOPICS}`, createNewTopic)
