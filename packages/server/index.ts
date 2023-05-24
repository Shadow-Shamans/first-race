import dotenv from 'dotenv'
import cors from 'cors'
// import { createServer as createViteServer } from 'vite'
// import type { ViteDevServer } from 'vite'
import express from 'express'
import { apiRouter, forumRouter } from './routes/api'
// import * as fs from 'fs'
// import * as path from 'path'

dotenv.config({ path: '../../.env' })

// const isDev = process.env.NODE_ENV === 'development'
const port = Number(process.env.SERVER_PORT) || 3001

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  console.log({ req, res })
  res.send('<h2>Server</h2>')
})

app.use('/api', apiRouter)
app.use('/api/forum', forumRouter)

app.listen(port, () => {
  console.log(`API listen on port ${port}`)
})
