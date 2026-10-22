import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change to '/' if your repository is named username.github.io.
  base: '/wei-han-portfolio/',
})
