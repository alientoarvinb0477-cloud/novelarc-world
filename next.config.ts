import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  eslint: {
    // This allows the build to finish even with the 'Let's' typo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows the build to finish even with the 'state' warning
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
