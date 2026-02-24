import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }, 
  base: "/PMP/",
  build: {
    // This ensures Vite treats index.html as the source of truth
    rollupOptions: {
      input: {
        main: './index.html', 
      }
    }
  }
});