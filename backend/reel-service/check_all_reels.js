const Reel = require('./models/Reel');

async function checkAllReels() {
    try {
        const reels = await Reel.findAll();
        console.log('Reels Count:', reels.length);
        reels.forEach(r => {
            console.log(`- ID: ${r.id}, Username: ${r.username}, VideoURL: ${r.videoUrl}`);
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkAllReels();
