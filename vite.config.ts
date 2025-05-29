import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react({
      jsxImportSource: '@welldone-software/why-did-you-render'
    })
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
  }
});
