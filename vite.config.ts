import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/atc-radar/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/atc-radar/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/atc-radar/, ''),
      },
    },
  },
})
