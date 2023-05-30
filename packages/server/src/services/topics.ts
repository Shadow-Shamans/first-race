import { ICreateTopic, IUpdateTopic } from '../models/types'
import { Topic } from '../init/db'

export const getAllTopicsService = async () => {
  console.log('11')
  return await Topic.findAll()
}

export const createTopicService = async (topicData: ICreateTopic) => {
  const { userId, title, description } = topicData
  // TODO message count
  const newTopic = await Topic.create({
    userId,
    title,
    description,
    messageCount: 0,
  })
  return newTopic
}

export const deleteTopicService = async (id: string) => {
  const currentTopic = await Topic.findOne({
    where: { id: id },
  })
  if (!currentTopic) {
    return "Topic doesn't exist"
  }
  const deletedTopic = await Topic.destroy({
    where: { id: id },
  })
  return deletedTopic
}

export const getOneTopicService = async (id: string) => {
  const currentTopic = await Topic.findOne({
    where: { id: id },
  })
  if (!currentTopic) {
    return null
  }
  return currentTopic
}

export const updateTopicService = async (data: IUpdateTopic) => {
  const { id, description, title } = data
  const currentTopic = await Topic.findOne({
    where: { id: id },
  })
  if (!currentTopic) {
    return 'Topic was not found'
  }
  const updatedTopic = await Topic.update(
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
  return updatedTopic
}
