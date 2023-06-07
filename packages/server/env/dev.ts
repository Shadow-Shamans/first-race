import { createServer as createViteServer } from 'vite'
import { Express } from 'express'
import * as fs from 'fs'
import * as path from 'path'

export async function setupDevSSR(app: Express) {
  const srcPath = path.dirname(require.resolve('client/package.json'))

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(
        path.resolve(srcPath, 'index.html'),
        'utf-8'
      )
      template = await vite!.transformIndexHtml(url, template)

      const render = (
        await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
      ).render
      const [initialReduxStore, appHtml] = await render(req.baseUrl)

      const initStateSerialized = JSON.stringify(initialReduxStore)

      const queryCode = req.query.code || ''

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('{{state}}', initStateSerialized)
        .replace('{{authCode}}', JSON.stringify(queryCode))

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error)
      next(e)
    }
  })
}
