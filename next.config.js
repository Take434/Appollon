/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ["i.scdn.co", "wiki.dave.eu"]
  },
}

module.exports = nextConfig
