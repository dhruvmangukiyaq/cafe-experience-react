import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // NOTE: port 5173 is used by another project on this machine,
  // so this app runs on 5174.
  server: {
    port: 5174,
    strictPort: true,
    // Proxy /api to the Express backend. The React app then calls
    // same-origin "/api/..." (see src/api.js), so the browser never
    // talks to :5001 directly — no CORS / wrong-port issues.
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
