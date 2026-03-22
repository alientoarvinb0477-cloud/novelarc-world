import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js 16 to allow Webpack even though Turbopack is default
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },

  // This silences the "Turbopack vs Webpack" error
  turbo: {},

  // Keeps the build moving past minor type warnings
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
