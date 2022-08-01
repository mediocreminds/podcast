/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
