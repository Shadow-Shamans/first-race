import { Comment } from '../init/db'

export const getAllCommentsService = async (id: string) => {
  try {
    return await Comment.findAll({
      where: {
        topicId: id,
      },
    })
  } catch (error) {
    throw new Error(`GET: Failed to get all topics for category with id ${id}`)
  }
}
