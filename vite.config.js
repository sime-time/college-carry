// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: "./docs",
    rollupOptions: {
      input: {
        index: 'index.html',
        about: 'about.html',
        pricing: 'pricing.html',
        contact: 'contact.html',
      },
    },
  },
});
