import { mergeConfig, searchForWorkspaceRoot, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    // 既存の resolve 設定はそのまま
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // ここから追記
    server: {
      fs: {
        allow: [
          // プロジェクトのルートディレクトリを許可リストに追加
          searchForWorkspaceRoot(process.cwd()),
          // エラーに出ていたパスを許可リストに追加
          '/opt/node_modules',
        ],
      },
    },
    // ここまで追記
  });
};