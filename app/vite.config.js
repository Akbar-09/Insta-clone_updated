import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        // Pass Range headers through for video streaming
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers.range) {
              proxyReq.setHeader('Range', req.headers.range);
            }
          });
        }
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
        secure: false
      },
      '/live': {
        target: 'http://192.168.1.4:8000', // Route directly to NMS HTTP port for HLS
        changeOrigin: true,
        secure: false
      }
    },
    port: 5175,
    strictPort: false,
  }
})
