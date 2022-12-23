/** @type {import('next').NextConfig} */

// images line for dissplaying user img from external domain with NextAuth login

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
