const Reel = require('./models/Reel');
const sequelize = require('./config/database');

async function debug() {
    try {
        const reel = await Reel.findByPk(56);
        if (reel) {
            console.log(`Reel 56: commentsCount = ${reel.commentsCount}`);
        } else {
            console.log('Reel 56 not found');
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
debug();
