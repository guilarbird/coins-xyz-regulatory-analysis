import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const clientRoot = path.resolve(__dirname, 'client')
const sharedRoot = path.resolve(__dirname, 'shared')

export default defineConfig({
  root: clientRoot,
  plugins: [react()],
  base: '/',
  publicDir: path.resolve(clientRoot, 'public'),
  resolve: {
    alias: {
      '@': path.resolve(clientRoot, 'src'),
      '@shared': sharedRoot,
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
