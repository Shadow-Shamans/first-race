import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IUser } from './types'

export const UserModel: ModelAttributes<Model, IUser> = {
  roleId: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'role_id',
  },
}
