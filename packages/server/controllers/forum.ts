import { Request, Response } from 'express'
import { ICreateTopic } from '../models/Topic'
import { getAllTopicsService, createTopicService } from '../services/forum'

export const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const allTopics = await getAllTopicsService()
    res.status(200).json({ data: allTopics })
  } catch (error) {
    res.status(400).json({ error: 'Cannot get all topic ' })
  }
}

export const createNewTopic = async (req: Request, res: Response) => {
  try {
    const newTopicData = req.body.data as ICreateTopic
    const newTopic = await createTopicService(newTopicData)
    res.status(200).json({ data: newTopic })
  } catch (error) {
    res.status(400).json({ error: 'Cannot create new topic ' })
  }
}
