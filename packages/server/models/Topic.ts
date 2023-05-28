import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface ITopic {
  id: number
  title: string
  description: string
  userId: string
  messageCount: number
}

export interface ICreateTopic {
  title: string
  description: string
  userId: string
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
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
    type: DataType.INTEGER,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
