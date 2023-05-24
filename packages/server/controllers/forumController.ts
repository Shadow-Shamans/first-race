import { Request, Response } from 'express'
import * as forumService from '../service/forumService'

export const getAllTopics = (req: Request, res: Response) => {
  console.log({ req })
  const allTopics = forumService.getAllTopics()
  res.send({ status: 'OK', data: allTopics })
}

export const getOneTopic = (req: Request, res: Response) => {
  console.log({ req })
  const topic = forumService.getOneTopic()
  res.send(`Get an existing topic ${topic}`)
}

export const createNewTopic = (req: Request, res: Response) => {
  console.log({ req })
  const newTopic = forumService.getOneTopic()
  res.send(`Create a new topic ${newTopic}`)
}

export const updateOneTopic = (req: Request, res: Response) => {
  console.log({ req })
  const updatedTopic = forumService.updateOneTopic()
  res.send(`Update an existing topic ${updatedTopic}`)
}

export const deleteOneTopic = (req: Express.Request, res: Response) => {
  console.log({ req })
  const deletedTopic = forumService.deleteOneTopic()
  res.send(`Delete an existing topic ${deletedTopic}`)
}
