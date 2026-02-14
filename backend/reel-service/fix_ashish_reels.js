const Reel = require('./models/Reel');

async function fixReels() {
    try {
        const [count] = await Reel.update(
            { username: 'ashish' },
            { where: { userId: 104 } }
        );
        console.log(`Updated ${count} reels for userId 104 to username 'ashish'`);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

fixReels();
