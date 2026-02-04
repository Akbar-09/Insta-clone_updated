const Reel = require('./models/Reel');
const sequelize = require('./config/database');

async function fixReelData() {
    try {
        await sequelize.authenticate();
        console.log('Reel Service Database connected.');

        const reels = await Reel.findAll();
        let fixedCount = 0;

        for (const reel of reels) {
            if (reel.videoUrl && reel.videoUrl.startsWith('/sample/')) {
                // Map local samples to public ones
                if (reel.videoUrl.includes('ForBiggerBlazes')) {
                    reel.videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
                } else if (reel.videoUrl.includes('ElephantsDream')) {
                    reel.videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
                } else {
                    reel.videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                }
                await reel.save();
                fixedCount++;
            }
        }

        console.log(`Successfully fixed ${fixedCount} reels.`);
        process.exit(0);
    } catch (error) {
        console.error('Error fixing reel data:', error);
        process.exit(1);
    }
}

fixReelData();
