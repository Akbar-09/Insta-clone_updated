require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');
const { Op } = require('sequelize');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Posts DB\n');

        // Find all posts with external URLs (w3schools, etc.)
        const externalPosts = await Post.findAll({
            where: {
                [Op.or]: [
                    { mediaUrl: { [Op.iLike]: '%w3schools%' } },
                    { mediaUrl: { [Op.iLike]: '%http://%' } },
                    { mediaUrl: { [Op.iLike]: '%https://%' } }
                ]
            }
        });

        console.log(`Found ${externalPosts.length} posts with external URLs:\n`);

        if (externalPosts.length > 0) {
            externalPosts.slice(0, 20).forEach((p, i) => {
                console.log(`${i + 1}. ID ${p.id} (${p.username}): ${p.mediaUrl}`);
            });
            console.log('');

            // Delete them
            console.log(`Deleting ${externalPosts.length} posts with external URLs...\n`);

            const deleted = await Post.destroy({
                where: {
                    [Op.or]: [
                        { mediaUrl: { [Op.iLike]: '%w3schools%' } },
                        { mediaUrl: { [Op.iLike]: '%http://%' } },
                        { mediaUrl: { [Op.iLike]: '%https://%' } }
                    ]
                }
            });

            console.log(`✅ Deleted ${deleted} posts with external URLs.`);
        } else {
            console.log('✅ No posts with external URLs found.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
