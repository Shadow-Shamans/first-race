import type { SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { TopicModel } from '../models/Topic'
import { CommentModel } from '../models/Comment'
import { RoleModel } from '../models/Role'
import { UserModel } from '../models/User'
import type { Dialect } from 'sequelize'
import { modalCommonOptions } from './constants'

dotenv.config({ path: '../../.env' })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DB_HOST,
  DIALECT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: DB_HOST,
  username: POSTGRES_USER,
  database: POSTGRES_DB,
  password: String(POSTGRES_PASSWORD),
  port: Number(POSTGRES_PORT),
  dialect: DIALECT as Dialect,
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
  foreignKey: 'topic_id',
})

Comment.belongsTo(Topic, {
  foreignKey: 'topic_id',
})

User.belongsTo(Role, {
  foreignKey: 'role_id',
})

Role.hasMany(User, {
  foreignKey: 'role_id',
})

export const dbConnect = async (): Promise<Client | null> => {
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
