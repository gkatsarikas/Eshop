import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', 
    port: 5173,  
    proxy: {
      // Proxy API requests to the Keycloak server
      "/realms": {
        target: "http://localhost:8182", 
        changeOrigin: true, 
        secure: false, 
      },
   
      "/admin": {
          target: "http://localhost:8182", // Admin API base URL
          changeOrigin: true,
          secure: false,
        },
      },
      
    },
  },
);
