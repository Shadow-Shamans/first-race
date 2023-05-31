import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { ITopic } from './types'

export const TopicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      max: 100,
      min: 1,
    },
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
  messageCount: {
    allowNull: true,
    type: DataType.INTEGER,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
