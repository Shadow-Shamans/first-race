import type { SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { topicModel } from '../models/Topic'
import { commentModel } from '../models/Comments'

dotenv.config({ path: '../../.env' })

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

export const Topic = sequelize.define('Topic', topicModel, {})
export const Comment = sequelize.define('Comment', commentModel, {})

Topic.hasMany(Comment)

Topic.create({
  userId: 1,
  title: `Новый топик`,
  description: `Описание`,
  messageCount: 0,
})

export const dbConnect = async (): Promise<Client | null> => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    sequelize
      .getQueryInterface()
      .showAllSchemas()
      .then(tableObj => {
        console.log('// Tables in database', '==========================')
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
