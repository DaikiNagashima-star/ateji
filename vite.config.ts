import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['groq-sdk']
  },
  build: {
    commonjsOptions: {
      include: [/groq-sdk/]
    }
  }
});