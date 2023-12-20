/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

const nextConfig = withPlugins([withTM, withFonts], {
  reactStrictMode: false,
  export: 'output'
});

module.exports = nextConfig;
