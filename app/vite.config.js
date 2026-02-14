import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.15:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://192.168.1.15:5000',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://192.168.1.15:5000',
        changeOrigin: true,
        ws: true,
        secure: false
      },
      '/live': {
        target: 'http://localhost:8000', // Route directly to NMS HTTP port for HLS
        changeOrigin: true,
        secure: false
      }
    },
    port: 5175,
    strictPort: false,
  }
})
