import { Comment } from '../init/db'

export const getAllCommentsService = async (id: string) => {
  return await Comment.findAll()
}
