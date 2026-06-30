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
  build: {
    // 🌟 Sourcemaps ativados: o DevTools passa a mostrar o ficheiro e a
    // linha reais do erro (Landing.jsx:42, por ex.) em vez de
    // index-XXXXXXXX.js:76. Depois de apanhares o bug, podes voltar a
    // pôr "false" para não expores o código fonte no bundle final.
    sourcemap: true,
  },
});