import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
    react(),
  ],
  base: "/sttp",
  resolve: {
    alias: [
      {
        find: /^@\/CommandPalette\/(.+)/,
        replacement: path.resolve(__dirname, 'src/features/CommandPalette/$1')
      },
      {
        find: /^@\/(.+)/,
        replacement: path.resolve(__dirname, 'src/$1')
      },
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
