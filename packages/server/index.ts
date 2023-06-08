import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dbConnect } from './src/init/db'
import { topicsRouter } from './src/routes/topics'
import express from 'express'
import {
  API_VERSION,
  COMMENTS_URL,
  TOPICS_URL,
  USER_URL,
  YA_API_URL,
} from './src/utils/constants/api'
import proxy from './src/middlewares/proxy'
import { userRouter } from './src/routes/user'
import { commentsRouter } from './src/routes/comments'
import { setupDevSSR, setupProdSSR } from './env'

dotenv.config({ path: '.env' })

async function startServer() {
  await dbConnect()

  const isDev = process.env.NODE_ENV === 'development'
  const isProd = process.env.NODE_ENV === 'production'
  const port = Number(process.env.SERVER_PORT) || 3001

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.use(YA_API_URL, proxy)
  app.use(`${API_VERSION}${TOPICS_URL}`, topicsRouter)
  app.use(`${API_VERSION}${USER_URL}`, userRouter)
  app.use(`${API_VERSION}${COMMENTS_URL}`, commentsRouter)

  if (isDev) {
    setupDevSSR(app)
  }

  if (isProd) {
    setupProdSSR(app)
  }

  app.listen(port, () => {
    console.log('==================================================')
    console.log('prod', isProd)
    console.log('dev', isDev)
    console.log(`API listen on port ${port}`)
    console.log('==================================================')
  })
}

startServer()
