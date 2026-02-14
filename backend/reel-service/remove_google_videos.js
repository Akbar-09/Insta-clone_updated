require('dotenv').config();
const sequelize = require('./config/database');
const Reel = require('./models/Reel');
const { Op } = require('sequelize');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected (Reel Service).\n');
        console.log('🔍 Searching for reels with Google APIs video URLs...\n');

        // Find all reels with Google storage URLs
        const googleVideoReels = await Reel.findAll({
            where: {
                [Op.or]: [
                    { videoUrl: { [Op.like]: '%googleapis.com%' } },
                    { videoUrl: { [Op.like]: '%storage.googleapis.com%' } },
                    { videoUrl: { [Op.like]: '%gtv-videos-bucket%' } }
                ]
            },
            raw: true
        });

        if (googleVideoReels.length === 0) {
            console.log('✅ No reels found with Google APIs video URLs.');
            await sequelize.close();
            process.exit(0);
        }

        console.log(`📊 Found ${googleVideoReels.length} reel(s) with Google APIs video URLs:\n`);

        // Display details of reels to be deleted
        googleVideoReels.forEach((reel, index) => {
            console.log(`${index + 1}. Reel ID: ${reel.id}`);
            console.log(`   User ID: ${reel.userId}`);
            console.log(`   Username: ${reel.username}`);
            console.log(`   Video URL: ${reel.videoUrl || 'N/A'}`);
            console.log(`   Caption: ${reel.caption ? reel.caption.substring(0, 50) + '...' : 'N/A'}`);
            console.log(`   Created: ${reel.createdAt}`);
            console.log('');
        });

        // Delete the reels
        console.log('🗑️  Deleting reels...\n');

        const deletedCount = await Reel.destroy({
            where: {
                [Op.or]: [
                    { videoUrl: { [Op.like]: '%googleapis.com%' } },
                    { videoUrl: { [Op.like]: '%storage.googleapis.com%' } },
                    { videoUrl: { [Op.like]: '%gtv-videos-bucket%' } }
                ]
            }
        });

        console.log(`✅ Successfully deleted ${deletedCount} reel(s) with Google APIs video URLs.`);
        console.log('\n🎉 Cleanup complete!');

    } catch (error) {
        console.error('❌ Error removing Google API videos from reels:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
