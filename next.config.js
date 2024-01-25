/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'react-syntax-highlighter',
  'shrinkpng',
  'figlet',
]);

const nextConfig = withPlugins([withTM], {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tools' : '',
  redirects: process.env.NODE_ENV === 'development' ? async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  }: undefined,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
});

module.exports = nextConfig;
