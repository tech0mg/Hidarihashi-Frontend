/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    PORT: (process.env.PORT || '3000'), // PORT は文字列として扱う
  },
  assetPrefix: '/', // デフォルトの静的ファイル配信
};

module.exports = nextConfig;
