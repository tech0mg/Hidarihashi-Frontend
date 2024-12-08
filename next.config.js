/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone'
}

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // appディレクトリを有効化
  },
};

