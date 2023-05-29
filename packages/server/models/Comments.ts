import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IComment } from './types'

export const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
