import { ICreateComment } from '../models/types'
import { Comment } from '../init/db'

export const getAllCommentsService = async (id: string) => {
  try {
    return await Comment.findAll({
      where: {
        topicId: id,
      },
    })
  } catch (error) {
    throw new Error(`GET: Failed to get all topics with id ${id}`)
  }
}

export const createCommentService = async (
  id: string,
  fields: ICreateComment
) => {
  try {
    return await Comment.create({
      content: fields.content,
      userId: fields.userId,
      topicId: id,
    })
  } catch (error) {
    console.log(error)
    throw new Error(`GET: Failed to create comment with id ${id}`)
  }
}
