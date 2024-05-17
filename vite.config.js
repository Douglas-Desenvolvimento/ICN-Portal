import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  base: "https://Douglas-Desenvolvimento.github.io/ICN-Portal",
  plugins: [
    react()
  ],
  server: {
    https: {
      key: path.resolve(__dirname, 'cert/private-key.pem'),
      cert: path.resolve(__dirname, 'cert/cert.pem')
    }
  }
})
