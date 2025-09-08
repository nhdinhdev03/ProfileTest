import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to network
    port: 5173,
    strictPort: false,
    open: false
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    open: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // Use modern Dart Sass API
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
