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

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Activar source maps en producción
    if (!dev) {
      config.devtool = 'source-map';

      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.sourceMap = true;
          break;
        }
      }
    }

    return config;
  },
};

module.exports = nextConfig;
