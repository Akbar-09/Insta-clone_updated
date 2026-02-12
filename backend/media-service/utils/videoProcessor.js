const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');
const path = require('path');
const fs = require('fs');

// Set paths
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);

/**
 * Generate a thumbnail for a video.
 */
const generateThumbnail = (videoPath, outputDir, filename) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                timestamps: ['1'], // Take snapshot at 1s or 50%
                filename: filename,
                folder: outputDir,
                size: '320x?' // Fixed width, auto height
            })
            .on('end', () => resolve())
            .on('error', (err) => {
                console.error("Thumbnail generation error:", err);
                // Resolve anyway to not break the whole process? Or reject?
                // Rejecting is safer to know something went wrong.
                reject(err);
            });
    });
};

/**
 * Process and optimize a video.
 */
const processVideo = (filePath, type = 'feed') => {
    return new Promise((resolve, reject) => {
        const parsedPath = path.parse(filePath);
        const outputFilename = `${parsedPath.name}_opt.mp4`;
        const outputPath = path.join(parsedPath.dir, outputFilename);
        const thumbnailFilename = `${parsedPath.name}_thumb.jpg`;
        // const thumbnailPath = path.join(parsedPath.dir, thumbnailFilename);

        let command = ffmpeg(filePath)
            .outputOptions([
                '-c:v libx264',   // H.264 Codec
                '-crf 23',        // Constant Rate Factor (23 is standard default)
                '-preset medium', // Balance speed/compression
                '-c:a aac',       // AAC Audio
                '-b:a 128k',      // Audio Bitrate
                '-movflags +faststart', // Optimize for web streaming
                '-pix_fmt yuv420p' // Ensure compatibility
            ]);

        // Constraint Video Bitrate as requested (1.5-3Mbps)
        // Overrides CRF to some extent if mainly constrained by maxrate/bufsize, but setting explicit bitrate is simpler.
        command.videoBitrate('2000k');

        // Resize logic
        if (type === 'reel' || type === 'story') {
            // Target vertical 1080 width, keep aspect ratio
            command.videoFilters('scale=1080:-2');
        } else {
            // Feed: limit width to 1080
            command.videoFilters('scale=1080:-2');
        }

        command
            .on('end', async () => {
                try {
                    // Generate thumbnail from the OPTIMIZED video (might be faster/cleaner)
                    await generateThumbnail(outputPath, parsedPath.dir, thumbnailFilename);

                    // Get metadata
                    ffmpeg.ffprobe(outputPath, (err, metadata) => {
                        if (err) return reject(err);

                        const videoStream = metadata.streams.find(s => s.codec_type === 'video');
                        const stats = fs.statSync(outputPath);

                        resolve({
                            path: outputPath,
                            filename: outputFilename,
                            thumbnailFilename: thumbnailFilename,
                            width: videoStream ? videoStream.width : 0,
                            height: videoStream ? videoStream.height : 0,
                            duration: metadata.format.duration, // Seconds
                            size: stats.size,
                            mimetype: 'video/mp4'
                        });
                    });
                } catch (err) {
                    console.error("Post-processing error:", err);
                    reject(err);
                }
            })
            .on('error', (err) => {
                console.error('Video processing error:', err);
                // If optimization fails, maybe return original? No, that defeats the purpose.
                // But specifically for valid files that fail encoding ??
                reject(err);
            })
            .save(outputPath);
    });
};

module.exports = { processVideo };
