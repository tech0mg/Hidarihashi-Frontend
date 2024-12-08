/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    PORT: '3000', // 環境変数にポート番号を設定
  },
};

module.exports = nextConfig;
