const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function testCreatePost() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        // Force lowercase 'image' to test the theory
        try {
            const post = await Post.create({
                userId: 1,
                username: 'test_user',
                caption: 'test caption',
                mediaUrl: '/test.jpg',
                mediaType: 'image' // This should fail if ENUM is case sensitive 'IMAGE'
            });
            console.log('Created post successfully:', post.toJSON());
        } catch (err) {
            console.error('Failed to create post with lowercase:', err.message);
        }

        // Try uppercase to confirm
        try {
            const post2 = await Post.create({
                userId: 1,
                username: 'test_user',
                caption: 'test caption 2',
                mediaUrl: '/test2.jpg',
                mediaType: 'IMAGE'
            });
            console.log('Created post successfully with uppercase:', post2.toJSON());

            // Clean up
            await post2.destroy();
        } catch (err) {
            console.error('Failed to create post with uppercase:', err.message);
        }

    } catch (error) {
        console.error('Test Error:', error);
    } finally {
        await sequelize.close();
    }
}

testCreatePost();
