import type { NextConfig } from "next";

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
  // This explicitly tells Next.js we are okay with using Webpack
  // and silences the Turbopack requirement.
  experimental: {} 
};

export default nextConfig;
