// Custom image loader for Next.js static exports
module.exports = function customLoader({ src, width, quality }) {
  // For static exports, we'll just return the src as-is
  // You can add any custom path transformations here if needed
  return `${src}?w=${width}&q=${quality || 75}`;
};
