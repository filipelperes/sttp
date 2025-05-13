import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  base: "/sttp",
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/utils/styles'),
      assets: path.resolve(__dirname, 'src/assets')
    }
  }
});
