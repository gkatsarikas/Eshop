import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Expose to all network interfaces
    port: 5173,        // Ensure the same port as exposed in docker-compose
  }
});
