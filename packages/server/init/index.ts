import type { SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { topicModel } from '../models/Topic'

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

// for (let i = 0; i < 5; i++) {
//   Topic.create({
//     userId: ++i,
//     title: `Новый топик ${i + 1}`,
//     description: `Описание ${i + 1}`,
//     messageCount: 0,
//   })
// }

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
