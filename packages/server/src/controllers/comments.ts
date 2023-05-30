import { Request, Response } from 'express'
import { getAllCommentsService } from '../services/comments'

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    console.log(id, '=> id топика')
    const allComments = await getAllCommentsService(id)
    res.status(200).json({ data: allComments })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot get comments' })
  }
}

export const addNewComment = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ data: 'success' })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot add new comment' })
  }
}

export const deleteComment = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ data: 'success' })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot delete comment' })
  }
}
