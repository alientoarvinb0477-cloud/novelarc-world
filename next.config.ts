import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js 16 to use Webpack instead of Turbopack for the build
  // which is necessary for certain 3D/Physics experiments.
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  // We silence the Turbopack warning by explicitly opting into Webpack
  // since Rapier physics currently prefers it.
  experimental: {
    turbo: {
       // Leave empty to signal we are handling config elsewhere
    }
  }
};

export default nextConfig;
