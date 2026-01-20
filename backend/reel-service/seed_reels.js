require('dotenv').config();
const sequelize = require('./config/database');
const Reel = require('./models/Reel');

const VIDEO_URLS = [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
];

async function seedReels() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync(); // Ensure table exists

        console.log('Seeding 20 Reels...');
        for (let i = 0; i < 20; i++) {
            const userId = Math.floor(Math.random() * 50) + 100;
            const url = VIDEO_URLS[i % VIDEO_URLS.length];
            await Reel.create({
                userId,
                username: `creator_${userId}`,
                caption: `Awesome reel ${i + 1} #reel #viral`,
                videoUrl: url,
                likesCount: Math.floor(Math.random() * 5000)
            });
        }

        console.log('Seeding Complete! Added 20 reels.');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedReels();
