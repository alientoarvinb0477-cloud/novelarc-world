import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* This is needed for Rapier Physics to work on the web */
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
