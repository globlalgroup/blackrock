/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),

  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3002/:path*',
      },
      {
        source: '/profile-images/:file*',
        destination: 'http://localhost:3002/profile-images/:file*',
      },
    ];
  },

  images: {
    domains: ['blackrockdpto.site', 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/profile-images/**',
      },
      {
        protocol: 'https',
        hostname: 'blackrockdpto.site',
        pathname: '/profile-images/**',
      },
    ],
  },

  allowedDevOrigins: ['http://167.71.31.194:3000'],
};

module.exports = nextConfig;
