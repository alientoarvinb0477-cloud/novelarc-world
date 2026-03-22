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
    // This is the "Safety Switch" that ignores those 'Let's' typos
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This ignores the 'state is defined' warning
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
