import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL || '/Food-App/',
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '0.0.1'),
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE || 'Food App')
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['react-bootstrap', 'bootstrap']
          }
        }
      }
    }
  }
})
