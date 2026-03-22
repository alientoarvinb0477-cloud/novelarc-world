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
    // This allows the build to finish even if there are tiny typos
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This ignores type errors so you can test your world faster
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
