/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

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
            destination: '/tools',
            basePath: false,
            permanent: true
        }
    ]
}
});

module.exports = nextConfig;
