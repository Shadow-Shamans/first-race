import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IRole } from './types'

export const RoleModel: ModelAttributes<Model, IRole> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}
