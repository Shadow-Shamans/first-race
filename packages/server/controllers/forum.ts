import { Request, Response } from 'express'
import { ICreateTopic, IUpdateTopic } from '../models/types'
import {
  getAllTopicsService,
  createTopicService,
  deleteTopicService,
  getOneTopicService,
  updateTopicService,
} from '../services/forum'

export const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const allTopics = await getAllTopicsService()
    res.status(200).json({ data: allTopics })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot get all topic' })
  }
}

export const getOneTopic = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const oneTopic = await getOneTopicService(id)
    if (oneTopic === null) {
      res.status(204).json({ data: oneTopic })
    } else {
      res.status(200).json({ data: oneTopic })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot get all topic' })
  }
}

export const createNewTopic = async (req: Request, res: Response) => {
  try {
    const newTopicData = req.body.data as ICreateTopic
    const newTopic = await createTopicService(newTopicData)
    res.status(200).json({ data: newTopic })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot create new topic' })
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  try {
    const updatedTopicData = req.body.data as IUpdateTopic
    const updatedTopic = await updateTopicService(updatedTopicData)
    if (typeof updatedTopic === 'string') {
      res.status(204).json({ data: updatedTopic })
    } else {
      res.status(200).json({ data: updatedTopic })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot update topic' })
  }
}

export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const deletedTopic = await deleteTopicService(id)
    if (typeof deletedTopic === 'string') {
      res.status(204).json({ data: deletedTopic })
    } else {
      res.status(200).json({ data: deletedTopic })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot delete topic' })
  }
}
