import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true, // Allow all hosts (Vite 6+)
    hmr: {
      clientPort: 443, // Force HMR to use SSL port for ngrok
    },
  },
})
