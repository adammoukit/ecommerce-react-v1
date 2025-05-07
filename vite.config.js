import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'postcss',
      'autoprefixer',
      'path',
      'fs',
      'source-map-js',
      'url'
    ]
  }
})
