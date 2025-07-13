import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
