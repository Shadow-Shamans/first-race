import { ICreateTopic } from '../models/Topic'
import { Topic } from '../init'

export const getAllTopicsService = async () => {
  const allTopics = await Topic.findAll()
  return allTopics
}

export const createTopicService = async (topicData: ICreateTopic) => {
  const { userId, title, description } = topicData
  const newDate = new Date()
  const newTopic = await Topic.create({
    userId,
    title,
    description,
    messageCount: 0,
    date: newDate,
  })
  return newTopic
}
