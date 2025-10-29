import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@zwa/ui': path.resolve(__dirname, './src/components/ui/index.ts'),
      '@zwa/icons': path.resolve(__dirname, './src/components/ui/icons.ts'),
      '@zwa/a11y': path.resolve(__dirname, './src/lib/a11y.ts'),
      '@zwa/seo': path.resolve(__dirname, './src/lib/seo.ts'),
    },
  },
})

