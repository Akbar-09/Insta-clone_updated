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
        const userMap = new Map();
        users.forEach(u => {
            userMap.set(parseInt(u.userId), {
                username: u.username,
                avatar: u.profilePicture
            });
        });
        console.log(`Loaded ${users.length} users for sync.`);

        // 2. Update Notifications
        console.log('Syncing Notifications...');
        let notifCount = 0;
        for (const [userId, { avatar }] of userMap.entries()) {
            if (avatar) {
                const [r] = await seq.query(
                    'UPDATE notifications SET from_user_avatar = :avatar WHERE from_user_id = :userId',
                    { replacements: { avatar, userId } }
                );
                notifCount++;
            }
        }
        console.log(`Processed sync for ${notifCount} users in Notifications.`);

        // 3. Update Search Index
        console.log('Syncing Search Index...');
        let searchResultsCount = 0;
        // The table name is definitely "SearchIndices" based on plural logic in Sequelize and previous check
        const [searchRecords] = await seq.query('SELECT id, type, "referenceId", metadata FROM "SearchIndices" WHERE type = \'USER\'');
        console.log(`Found ${searchRecords.length} user records in SearchIndices.`);

        for (const record of searchRecords) {
            const userId = parseInt(record.referenceId);
            if (userMap.has(userId)) {
                const { avatar, username } = userMap.get(userId);
                if (avatar) {
                    const newMetadata = {
                        ...record.metadata,
                        avatarUrl: avatar,
                        profilePicture: avatar,
                        username: username
                    };
                    await seq.query(
                        'UPDATE "SearchIndices" SET metadata = :metadata WHERE id = :id',
                        { replacements: { metadata: JSON.stringify(newMetadata), id: record.id } }
                    );
                    searchResultsCount++;
                }
            }
        }
        console.log(`Updated ${searchResultsCount} records in SearchIndex.`);

        // 4. Update Feed/Post user info if exists
        // Some feeds store user info to avoid joins
        const [tables] = await seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        const tableNames = tables.map(t => t.table_name);

        if (tableNames.includes('Posts')) {
            console.log('Syncing Posts user info...');
            const [postCols] = await seq.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'Posts'");
            const cols = postCols.map(c => c.column_name);

            if (cols.includes('userAvatar')) {
                for (const [userId, { avatar }] of userMap.entries()) {
                    if (avatar) {
                        await seq.query(
                            'UPDATE "Posts" SET "userAvatar" = :avatar WHERE "userId" = :userId',
                            { replacements: { avatar, userId } }
                        );
                    }
                }
                console.log('Posts userAvatars synced.');
            }
        }

        console.log('\n✅ Global Sync Complete.');

    } catch (error) {
        console.error('Sync Failed:', error.message);
    } finally {
        await seq.close();
    }
}

sync();
