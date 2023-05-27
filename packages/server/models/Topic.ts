import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface ITopic {
  id: number
  title: string
  description: string
  userId: string
  messageCount: number
  date: string
}

export interface ICreateTopic {
  title: string
  description: string
  userId: string
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.UUID,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
  messageCount: {
    type: DataType.NUMBER,
    allowNull: false,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  userId: {
    type: DataType.NUMBER,
    allowNull: false,
  },
}
