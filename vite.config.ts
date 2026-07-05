import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { apiDevPlugin } from './vite-api-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.RESEND_API_KEY = env.RESEND_API_KEY
  process.env.CONTACT_EMAIL = env.CONTACT_EMAIL || 'denisjanuzi@gmail.com'
  process.env.RESEND_FROM = env.RESEND_FROM || 'Portfolio Form <onboarding@resend.dev>'
  process.env.GMAIL_USER = env.GMAIL_USER
  process.env.GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD

  return {
    plugins: [vue(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
    },
  }
})
