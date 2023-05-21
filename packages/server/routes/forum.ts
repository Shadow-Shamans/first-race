import express, { Router } from 'express'
import { forumController } from '../controllers'

export const forumRouter: Router = express.Router()
forumRouter.get('/', forumController.getAllThreads)
