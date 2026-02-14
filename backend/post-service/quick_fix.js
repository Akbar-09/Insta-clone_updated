require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database\n');

        // Fix posts marked as VIDEO but have image extensions
        console.log('Fixing posts with incorrect mediaType...\n');

        const [result] = await sequelize.query(`
            UPDATE "Posts" 
            SET "mediaType" = 'IMAGE' 
            WHERE "mediaType" = 'VIDEO' 
            AND (
                "mediaUrl" ILIKE '%.jpg' 
                OR "mediaUrl" ILIKE '%.jpeg' 
                OR "mediaUrl" ILIKE '%.png' 
                OR "mediaUrl" ILIKE '%.gif'
                OR "mediaUrl" ILIKE '%.webp'
                OR "mediaUrl" NOT ILIKE '%.mp4'
                AND "mediaUrl" NOT ILIKE '%.webm'
                AND "mediaUrl" NOT ILIKE '%.mov'
                AND "mediaUrl" NOT ILIKE '%.avi'
            )
        `);

        console.log('Update complete!');
        console.log('Result:', result);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
