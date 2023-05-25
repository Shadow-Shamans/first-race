import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { apiRouter, forumRouter } from './routes/api'
import { setupDevServer, setupProdServer } from './envSetup'

dotenv.config({ path: '../../.env' })

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.SERVER_PORT) || 3001

const app = express()

app.use(cors())

app.use('/api', apiRouter)
app.use('/api/forum', forumRouter)

if (isDev) {
  setupDevServer(app)
}

if (isProd) {
  setupProdServer(app)
}

app.listen(port, () => {
  console.log(`API listen on port ${port}`)
})
