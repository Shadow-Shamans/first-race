import { Request, Response } from 'express'
import {
  createCommentService,
  deleteCommentService,
  getAllCommentsService,
  getOneCommentService,
} from '../services/comments'
import { ICreateComment } from '../models/types'

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
  const newCommentDataDTO = req.body.data as ICreateComment
  const newCommentData = await createCommentService(id, newCommentDataDTO)

  try {
    res.status(200).json({ data: newCommentData })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot add new comment' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const commentToDelete = await getOneCommentService(id)

    await deleteCommentService(id)

    res.status(200).json({ data: commentToDelete })
  } catch (error) {
    res.status(400).json({ error: 'Error. Cannot delete comment' })
  }
}
