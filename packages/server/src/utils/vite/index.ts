import { createServer as createViteServer } from 'vite'

export async function getViteDevServer(srcPath: string) {
  return await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  })
}
