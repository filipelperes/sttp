import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { servicesWriterPlugin } from './scripts/vite-plugin-services-writer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
    react(),
    servicesWriterPlugin(),
  ],
  base: "/sttp",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react';
          if (id.includes('node_modules/react-icons')) return 'vendor-icons';
          if (id.includes('node_modules/zustand')) return 'vendor-state';
        },
      },
    },
  },
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
