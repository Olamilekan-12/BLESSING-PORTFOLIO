// This script will optimize images in the public directory
// Run with: node scripts/optimize-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const MAX_WIDTH = 2000;
const QUALITY = 80;
const OUTPUT_FORMAT = 'webp';

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Only resize if image is wider than MAX_WIDTH
    const resizeOptions = metadata.width > MAX_WIDTH 
      ? { width: MAX_WIDTH }
      : {};

    await image
      .resize(resizeOptions)
      .webp({ 
        quality: QUALITY,
        effort: 6 // Higher effort = better compression but slower
      })
      .toFile(outputPath);

    const originalSize = (await stat(inputPath)).size;
    const optimizedSize = (await stat(outputPath)).size;
    const saved = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

    console.log(`Optimized: ${path.basename(inputPath)}`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`  Saved: ${saved}%\n`);

    return { originalSize, optimizedSize };
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return null;
  }
}

async function processDirectory(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (['.jpg', '.jpeg', '.png'].includes(path.extname(file.name).toLowerCase())) {
      const outputPath = path.join(
        path.dirname(fullPath),
        `${path.basename(file.name, path.extname(file.name))}.${OUTPUT_FORMAT}`
      );
      
      // Only process if output doesn't exist or source is newer
      try {
        const outputExists = await stat(outputPath).then(() => true).catch(() => false);
        const sourceStat = await stat(fullPath);
        const outputStat = outputExists ? await stat(outputPath) : { mtimeMs: 0 };
        
        if (!outputExists || sourceStat.mtimeMs > outputStat.mtimeMs) {
          await optimizeImage(fullPath, outputPath);
        }
      } catch (error) {
        console.error(`Error checking file stats for ${fullPath}:`, error);
      }
    }
  }
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  console.log('Starting image optimization...\n');
  await processDirectory(publicDir);
  console.log('Image optimization complete!');
}

main().catch(console.error);
