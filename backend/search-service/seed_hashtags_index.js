require('dotenv').config();
const sequelize = require('./config/database');
const SearchIndex = require('./models/SearchIndex');

async function seedHashtags() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const hashtags = [
            '#nature', '#photography', '#travel', '#fitness', '#foodie',
            '#art', '#lifestyle', '#tech', '#fashion', '#music', '#gym',
            '#love', '#instagood', '#reels', '#trending', '#explore'
        ];

        console.log('Seeding Hashtags into Search Index...');

        for (const tag of hashtags) {
            const [item, created] = await SearchIndex.findOrCreate({
                where: {
                    type: 'HASHTAG',
                    content: tag
                },
                defaults: {
                    referenceId: 0,
                    content: tag,
                    metadata: {
                        postCount: Math.floor(Math.random() * 5000) + 100
                    }
                }
            });

            if (created) {
                console.log(`Added hashtag: ${tag}`);
            } else {
                console.log(`Hashtag ${tag} already exists.`);
            }
        }

        console.log('Hashtag Seeding Complete!');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedHashtags();
