/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter', 'shrinkpng']);

const nextConfig = withPlugins([withTM], {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tools',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tools/home',
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
