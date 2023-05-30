import { Request, Response } from 'express'
import {
  createCommentService,
  getAllCommentsService,
} from '../services/comments'

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const allComments = await getAllCommentsService(id)
    res.status(200).json({ data: allComments })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot get comments' })
  }
}

export const addNewComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const newCommentDataDTO = req.body.data as any
  const newCommentData = await createCommentService(id, newCommentDataDTO)
  console.log(newCommentData, '=> newCommentData')
  console.log(id, '=> id')
  try {
    res.status(200).json({ data: 'success' })
  } catch (error) {
    console.log(error)
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
