/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["books.google.com", "flxt.tmsimg.com"],
  },
};

module.exports = nextConfig;
