import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/zw-topics-organics/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@zwa/ui': path.resolve(__dirname, './src/components/ui/index.ts'),
      '@zwa/icons': path.resolve(__dirname, './src/components/ui/icons.ts'),
      '@zwa/a11y': path.resolve(__dirname, './src/lib/a11y.tsx'),
      '@zwa/seo': path.resolve(__dirname, './src/lib/seo.ts'),
    },
  },
})

