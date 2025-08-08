/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization API when using static export
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    domains: ['img.youtube.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for static export
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Enable SWC minification
  swcMinify: true,
  // Enable production browser source maps
  productionBrowserSourceMaps: true,
  // Enable static exports for static site generation
  output: 'export',
  // Add trailing slash for static exports
  trailingSlash: true,
};

module.exports = nextConfig;

module.exports = nextConfig;
