import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { TopicModel } from '../models/Topic'
import { CommentModel } from '../models/Comment'
import { RoleModel } from '../models/Role'
import { UserModel } from '../models/User'
import { modalCommonOptions } from './constants'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DB_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: DB_HOST,
  username: POSTGRES_USER,
  database: POSTGRES_DB,
  password: String(POSTGRES_PASSWORD),
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', TopicModel, modalCommonOptions)
export const Comment = sequelize.define(
  'Comment',
  CommentModel,
  modalCommonOptions
)
export const Role = sequelize.define('Role', RoleModel, modalCommonOptions)
export const User = sequelize.define('User', UserModel, modalCommonOptions)

Topic.hasMany(Comment, {
  foreignKey: 'parentId',
})

Comment.belongsTo(Topic, {
  foreignKey: 'parentId',
})

User.belongsTo(Role, {
  foreignKey: 'roleId',
})

Role.hasMany(User, {
  foreignKey: 'roleId',
})

export const dbConnect = async (): Promise<any | null> => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    sequelize
      .getQueryInterface()
      .showAllSchemas()
      .then(tableObj => {
        console.log('// Tables in database', '=========================')
        console.log(tableObj)
      })
      .catch(err => {
        console.log('showAllSchemas ERROR', err)
      })
  } catch (e) {
    console.error(e)
  }
  return null
}
