import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(async ({ mode }) => {
  return {
    build: {
      assetsInlineLimit: 20480,
      minify: process.env.NODE_ENV !== 'development',
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 40960,
        },
        plugins: [
          mode === 'analyze' &&
            visualizer({
              brotliSize: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              open: true,
            }),
          viteCompression(),
        ],
      },
      target: 'chrome110',
    },
    plugins: [
      react(),
      // wasm(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
    ],
  };
});
