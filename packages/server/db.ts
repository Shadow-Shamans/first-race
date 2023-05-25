import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const sequelizeOptions: SequelizeOptions = {
      host: 'postgres',
      username: POSTGRES_USER,
      database: POSTGRES_DB,
      password: String(POSTGRES_PASSWORD),
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    }

    const sequelize = new Sequelize(sequelizeOptions)
    sequelize.addModels([])

    await sequelize.sync()
  } catch (e) {
    console.error(e)
  }

  return null
}
