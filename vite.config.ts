import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import { visualizer } from 'rollup-plugin-visualizer';

import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async ({ mode }) => {
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 20480,
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
        // TODO: 気になる
        videos,
      }),
    ],
  };
});
