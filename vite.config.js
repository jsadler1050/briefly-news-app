// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // <-- ADD THIS SECTION
    proxy: {
      // All requests starting with '/news' from your React app
      // will be forwarded to your running proxy server.
      '/news': {
        target: 'http://localhost:3001', // Replace 3001 if your proxy uses a different port
        changeOrigin: true, // Needed for virtual hosting/CORS
        secure: false, // Use false if your proxy server is running on plain HTTP
      }
    }
  },
  // Keep the base config for now, but see point #2 below.
  base: "/briefly-news-app/" 
})