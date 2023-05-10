import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config({
  path: '../../.env',
})

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.ts',
      injectRegister: null,
      strategies: 'injectManifest',
      srcDir: 'src',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName: `[name]_[local]_[hash:base64:5]`,
    },
  },
})
