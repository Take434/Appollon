/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      }
    ],
  },
  output: "standalone",
}

module.exports = nextConfig
