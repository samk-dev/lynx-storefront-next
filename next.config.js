/** @type {import('next').NextConfig} */
const { driversConfig } = require('./config');

module.exports = driversConfig({
  drivers: {
    shop: 'shopify',
  },
  reactStrictMode: true,
});

if (process.env.NODE_ENV === 'development') {
  console.log('nextConfig', JSON.stringify(module.exports, null, 2));
}
