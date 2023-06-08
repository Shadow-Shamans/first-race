import { createProxyMiddleware } from 'http-proxy-middleware'
import { BASE_YA_URL } from '../utils/constants/api'

const proxyOptions = {
  target: BASE_YA_URL,
  changeOrigin: true,
  pathRewrite: { '^/ya-api': '' },
  secure: false,
  cookieDomainRewrite: { '*': '' },
}
const proxy = createProxyMiddleware(proxyOptions)

export default proxy
