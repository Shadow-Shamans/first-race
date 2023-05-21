import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { ForumThread } from './models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async () => {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    username: POSTGRES_USER,
    database: POSTGRES_DB,
    password: String(POSTGRES_PASSWORD),
    port: Number(POSTGRES_PORT),
    dialect: 'postgres',
  }

  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([ForumThread])

  await sequelize.sync()
}
