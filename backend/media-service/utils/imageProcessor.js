const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Process and optimize an image.
 * @param {string} filePath - Absolute path to the input file.
 * @param {string} type - Type of image ('feed', 'story', 'profile').
 * @returns {Promise<Object>} - Object containing details of the processed image.
 */
const processImage = async (filePath, type = 'feed') => {
    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        let resizeOptions = {};
        const quality = 80;

        switch (type) {
            case 'story':
                resizeOptions = {
                    width: 1080,
                    height: 1920,
                    fit: 'cover',
                    position: 'center'
                };
                break;
            case 'profile':
                resizeOptions = {
                    width: 320,
                    height: 320,
                    fit: 'cover',
                    position: 'center'
                };
                break;
            case 'ads':
                resizeOptions = {
                    width: 1080,
                    height: 1080,
                    fit: 'cover',
                    position: 'center'
                };
                break;
            case 'feed':
            default:
                // Only resize if larger than 1080px width
                if (metadata.width > 1080) {
                    resizeOptions = {
                        width: 1080,
                        withoutEnlargement: true
                    };
                }
                break;
        }

        const parsedPath = path.parse(filePath);
        // Use a suffix for the optimized file
        const outputFilename = `${parsedPath.name}_opt.webp`;
        const outputPath = path.join(parsedPath.dir, outputFilename);

        const pipeline = image
            .rotate() // Auto-rotate based on EXIF before stripping it
            .resize(resizeOptions)
            .webp({ quality: quality }) // Convert to WebP
            .withMetadata(false); // Strip metadata

        const info = await pipeline.toFile(outputPath);

        // Optional: Generate a thumbnail for feed posts? 
        // For now, adhering to main requirement of optimizing the main image.

        return {
            path: outputPath,
            filename: outputFilename,
            width: info.width,
            height: info.height,
            format: 'webp',
            size: info.size,
            mimetype: 'image/webp'
        };

    } catch (error) {
        console.error('Image processing error:', error);
        throw error;
    }
};

module.exports = { processImage };
