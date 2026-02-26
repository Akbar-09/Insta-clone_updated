import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: process.env.VITE_NO_HTTPS ? false : true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        ws: true,
        secure: false,
        xfwd: true
      },
      '/live': {
        target: 'http://192.168.1.4:8000', // Route directly to NMS HTTP port for HLS
        changeOrigin: true,
        secure: false
      }
    },
    port: 5175,
    strictPort: false,
    allowedHosts: true,
  }
})
