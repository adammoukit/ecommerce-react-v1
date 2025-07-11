import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

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
  },
  assetsInclude: ['**/*.JPG'] 
  ,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
