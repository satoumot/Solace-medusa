// ./config/vite.config.js

import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  server: {
    fs: {
      // プロジェクトのルートディレクトリを許可リストに追加
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});