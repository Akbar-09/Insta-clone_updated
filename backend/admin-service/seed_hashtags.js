const { Hashtag } = require('./models');
const sequelize = require('./config/database');
const axios = require('axios');

async function seedHashtags() {
    try {
        await sequelize.authenticate();
        console.log('Admin Database connected.');

        // 1. Define interesting hashtags
        const initialHashtags = [
            { name: '#nature', postsCount: 1250, reelsCount: 450, isTrending: true, status: 'active' },
            { name: '#photography', postsCount: 3400, reelsCount: 890, isTrending: true, status: 'active' },
            { name: '#travel', postsCount: 2100, reelsCount: 670, isTrending: false, status: 'active' },
            { name: '#fitness', postsCount: 1560, reelsCount: 340, isTrending: true, status: 'active' },
            { name: '#foodie', postsCount: 980, reelsCount: 120, isTrending: false, status: 'active' },
            { name: '#art', postsCount: 5600, reelsCount: 1200, isTrending: true, status: 'active' },
            { name: '#lifestyle', postsCount: 750, reelsCount: 90, isTrending: false, status: 'active' },
            { name: '#tech', postsCount: 430, reelsCount: 45, isTrending: false, status: 'active' },
            { name: '#fashion', postsCount: 8900, reelsCount: 2100, isTrending: true, status: 'active' },
            { name: '#music', postsCount: 1200, reelsCount: 560, isTrending: false, status: 'active' },
            { name: '#dummy', postsCount: 15, reelsCount: 2, isTrending: false, status: 'active' }
        ];

        for (const data of initialHashtags) {
            await Hashtag.findOrCreate({
                where: { name: data.name },
                defaults: data
            });
            console.log(`Ensured hashtag: ${data.name}`);
        }

        console.log('Hashtag seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding hashtags:', error);
        process.exit(1);
    }
}

seedHashtags();
