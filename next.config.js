/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  // Disable image optimization API when using static export
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for static export
  },
  // Enable React Strict Mode
  reactStrictMode: true,

  // Enable production browser source maps
  productionBrowserSourceMaps: true,
  // Enable static exports for static site generation
  output: 'export',
  // Add trailing slash for static exports
  trailingSlash: true,
};

module.exports = nextConfig;
