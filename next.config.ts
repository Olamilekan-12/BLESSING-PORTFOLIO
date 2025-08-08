import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com', 'img.youtube.com'],
  },
};

export default nextConfig;
