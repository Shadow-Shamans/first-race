import { ICreateTopic, IUpdateTopic } from '../models/types'
import { Topic } from '../init/db'
import { getAllCommentsService } from './comments'

export const getAllTopicsService = async () => {
  // Тк у нас изначально все каунты были в 0, нужно их обновлять (обр совместимость)
  const allTopics = await Topic.findAll()

  await Promise.all(
    allTopics.map(async topic => {
      await updateTopicMessageCount(topic.id)
    })
  )

  return Topic.findAll()
}

export const createTopicService = async (topicData: ICreateTopic) => {
  const { userId, title, description } = topicData

  return Topic.create({
    userId,
    title,
    description,
    messageCount: 0,
  })
}

export const deleteTopicService = async (id: string) => {
  return await Topic.destroy({
    where: { id: id },
  })
}

export const getOneTopicService = async (id: string) => {
  await updateTopicMessageCount(id)

  return await Topic.findOne({
    where: { id: id },
  })
}

export const updateTopicService = async (data: IUpdateTopic) => {
  const { id, description, title } = data

  return await Topic.update(
    {
      description,
      title,
    },
    {
      where: {
        id: id,
      },
    }
  )
}

export const updateTopicMessageCount = async (id: string) => {
  const comments = await getAllCommentsService(id)

  return await Topic.update(
    {
      messageCount: comments.length,
    },
    {
      where: {
        id: id,
      },
    }
  )
}
