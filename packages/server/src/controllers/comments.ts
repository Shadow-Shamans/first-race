import { Request, Response } from 'express'
import { getAllCommentsService } from '../services/comments'

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const allComments = await getAllCommentsService(id)
    res.status(200).json({ data: allComments })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot get comments' })
  }
}
