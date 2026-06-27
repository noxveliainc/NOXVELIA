import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Adiciona isto no topo

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Isto mapeia o '@' para a pasta 'src'
    },
  },
});