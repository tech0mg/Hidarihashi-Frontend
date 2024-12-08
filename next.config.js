/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    PORT: process.env.PORT || 3000,
  },
  experimental: {
    appDir: true,
  },
  basePath: '', // サブディレクトリにホスティングする場合に変更
  assetPrefix: './', // 静的ファイルの配信を調整する
};

module.exports = nextConfig;
