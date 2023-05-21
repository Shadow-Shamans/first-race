import type { Request, Response } from 'express'
import { literal } from 'sequelize'
import { ForumThread } from '../models'

class ForumController {
  public getAllThreads = async (_request: Request, response: Response) => {
    const threads = await ForumThread.findAll({
      attributes: [
        'id',
        'name',
        [literal('(SELECT count(*) from "forum_message")'), 'countAnswer'],
      ],
      group: ['id', 'name'],
    })

    response.send(threads)
  }
}

export const forumController = new ForumController()
