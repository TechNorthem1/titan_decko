/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'titandecko.com.co',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
};

module.exports = nextConfig;
