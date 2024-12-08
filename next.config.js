/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone'
}

module.exports = {
  experimental: {
    appDir: true, // appディレクトリを有効化
  },
};

