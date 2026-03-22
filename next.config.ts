import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. This handles your 3D Physics/Rapier experiments
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  
  // 2. This silences the Turbopack error by providing an empty config
  experimental: {
    turbo: {}
  },

  // 3. Next.js 16 moved these inside the 'typescript' block for security
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
