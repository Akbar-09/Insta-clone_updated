const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userId: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    caption: DataTypes.STRING
}, {
    tableName: 'Posts', // Standard
    timestamps: true
});

const brokenUuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';

async function check() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');

        console.log(`Searching Posts for media matching "${brokenUuid}"...`);

        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { mediaUrl: { [Op.like]: `%${brokenUuid}%` } },
                    { thumbnailUrl: { [Op.like]: `%${brokenUuid}%` } }
                ]
            }
        });

        if (posts.length === 0) {
            console.log('No posts found with this media.');
        } else {
            console.log(`Found ${posts.length} posts with broken media.`);
            for (const p of posts) {
                console.log(`Post ID: ${p.id}, Media: ${p.mediaUrl}`);
                // Delete the post
                await p.destroy();
                console.log(`Deleted post ${p.id}`);
            }
            console.log('Purge complete.');
        }

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

check();
