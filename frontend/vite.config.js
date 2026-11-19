import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api calls are proxied to the Spring Boot server on port 8080.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8080' },
  },
  preview: {
    proxy: { '/api': 'http://localhost:8080' },
  },
});
