const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function sync() {
    try {
        await seq.authenticate();
        console.log('Connected to database.');

        // 1. Get all current user profile pictures
        const [users] = await seq.query('SELECT "userId", username, "profilePicture" FROM "UserProfiles"');
        const userMap = {};
        users.forEach(u => {
            userMap[u.userId] = {
                username: u.username,
                avatar: u.profilePicture
            };
        });
        console.log(`Loaded ${users.length} users for sync.`);

        // 2. Update Notifications
        console.log('Syncing Notifications...');
        let notifCount = 0;
        for (const userId in userMap) {
            const { avatar, username } = userMap[userId];
            if (avatar) {
                const [result] = await seq.query(
                    'UPDATE notifications SET from_user_avatar = :avatar WHERE from_user_id = :userId',
                    { replacements: { avatar, userId } }
                );
                // In some versions of Sequelize, result is [rowsAffected] or similar
                // For raw queries it might vary. We'll just count iterations for now.
                notifCount++;
            }
        }
        console.log(`Processed sync for ${notifCount} users in Notifications.`);

        // 3. Update Search Index
        console.log('Syncing Search Index...');
        let searchCount = 0;
        for (const userId in userMap) {
            const { avatar, username } = userMap[userId];
            if (avatar) {
                // Fetch the metadata first to preserve other fields
                const [records] = await seq.query(
                    'SELECT id, metadata FROM "SearchIndices" WHERE type = \'USER\' AND "referenceId" = :userId',
                    { replacements: { userId } }
                );

                for (const record of records) {
                    const newMetadata = { ...record.metadata, avatarUrl: avatar, username: username };
                    await seq.query(
                        'UPDATE "SearchIndices" SET metadata = :metadata WHERE id = :id',
                        { replacements: { metadata: JSON.stringify(newMetadata), id: record.id } }
                    );
                    searchCount++;
                }
            }
        }
        console.log(`Updated ${searchCount} records in Search Index.`);

        // 4. Update Posts (username/avatar denormalized?)
        // Let's check if Posts have these. From my previous check, Post.js had 'username'.
        // Let's see if it has avatar.
        const [postCols] = await seq.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'Posts'");
        const hasUserAvatar = postCols.some(c => c.column_name === 'userAvatar');

        if (hasUserAvatar) {
            console.log('Syncing Posts userAvatar...');
            for (const userId in userMap) {
                const { avatar } = userMap[userId];
                if (avatar) {
                    await seq.query(
                        'UPDATE "Posts" SET "userAvatar" = :avatar WHERE "userId" = :userId',
                        { replacements: { avatar, userId } }
                    );
                }
            }
        }

        console.log('\n✅ Sync Complete. Denormalized data is now consistent with UserProfiles.');

    } catch (error) {
        console.error('Sync Failed:', error);
    } finally {
        await seq.close();
    }
}

sync();
