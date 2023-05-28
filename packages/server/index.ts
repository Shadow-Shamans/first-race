import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { dbConnect } from './init'
import { forumRouter } from './routes/forum'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '../../.env' })

dbConnect().then(async () => {
  startServer()
})

const isDev = process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3000

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client/package.json'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.use('/api/forum', forumRouter)

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template: string

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url?: string) => Promise<string>

      if (!isDev) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }
      const [initialReduxStore, appHtml] = await render(req.baseUrl)

      const initStateSerialized = JSON.stringify(initialReduxStore)

      const queryCode = req.query.code || ''

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('{{state}}', initStateSerialized)
        .replace('{{authCode}}', JSON.stringify(queryCode))

      // res.status(200).set({ 'Content-Type': 'text/html', 'x-code':  `${req.query.code}`}).end(html)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev) {
        vite?.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}
