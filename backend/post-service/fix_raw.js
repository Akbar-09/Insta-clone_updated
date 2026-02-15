const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function rawSearch() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const [results, metadata] = await sequelize.query(
            'SELECT id, "mediaUrl", "mediaType" FROM "Posts" WHERE "mediaUrl" LIKE :search',
            {
                replacements: { search: '%1770293285905-80005929.jpg%' }
            }
        );

        console.log('Found results:', results);

        if (results.length > 0) {
            const postId = results[0].id;
            const fixedUrl = '/uploads/1770293285905-80005929_opt.webp';
            console.log(`Fixing Post ${postId}...`);
            await sequelize.query(
                'UPDATE "Posts" SET "mediaUrl" = :fixedUrl WHERE id = :id',
                {
                    replacements: { fixedUrl, id: postId }
                }
            );
            console.log('Success!');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

rawSearch();
