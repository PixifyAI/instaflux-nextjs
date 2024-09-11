/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.runware.ai'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig