import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opendata.paris.fr',
      },
      {
        protocol: 'https',
        hostname: 'cdn.paris.fr',
      },
    ],
  },
};

export default nextConfig;
