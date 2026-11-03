import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Vite only trusts localhost by default (DNS-rebinding protection), so a
    // tunnelled host is rejected. A leading dot matches the domain and all of
    // its subdomains, which matters because free ngrok URLs change every restart.
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // React rarely changes: keeping it in its own chunk means a content
        // edit only invalidates the small app chunk in visitors' caches.
        // framer-motion is deliberately NOT listed here — manual-chunking it
        // would undo the LazyMotion code-split.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client'],
        },
      },
    },
  },
});
