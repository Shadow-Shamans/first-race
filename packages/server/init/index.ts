import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { topicModel } from '../models/Topic'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  username: POSTGRES_USER,
  database: POSTGRES_DB,
  password: String(POSTGRES_PASSWORD),
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', topicModel, {})

export const dbConnect = async (): Promise<Client | null> => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (e) {
    console.error(e)
  }
  return null
}
