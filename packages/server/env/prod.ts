import { Express } from 'express'
import * as fs from 'fs'
import * as path from 'path'

export async function setupProdSSR(app: Express) {
  const distPath = path.dirname(require.resolve('/app/client/index.html'))
  const ssrClientPath = require.resolve('/app/client/client.cjs')

  app.use('*', async (req, res, next) => {
    console.log({ req, res })
    try {
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      )

      const render = (await import(ssrClientPath)).render

      const [initialReduxStore, appHtml] = await render(req.baseUrl)

      const initStateSerialized = JSON.stringify(initialReduxStore)

      const queryCode = req.query.code || ''

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('{{state}}', initStateSerialized)
        .replace('{{authCode}}', JSON.stringify(queryCode))

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })
}
