const { Sequelize } = require('sequelize');
const crypto = require('crypto');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function ultimateSync() {
    try {
        await seq.authenticate();
        console.log('Connected to database.');

        // 1. Get all Users for mapping
        const [users] = await seq.query('SELECT "userId", username, "profilePicture" FROM "UserProfiles"');
        const userMap = new Map();
        users.forEach(u => {
            userMap.set(parseInt(u.userId), {
                username: u.username,
                avatar: u.profilePicture
            });
        });
        console.log(`Loaded ${users.length} users.`);

        // 2. Fix the Media Table
        console.log('Syncing Media Table fallback entries...');
        let mediaCount = 0;
        for (const [userId, { avatar }] of userMap.entries()) {
            if (avatar && avatar.includes('/media/files/')) {
                const key = avatar.split('/media/files/')[1];
                const filename = key.split('/').pop();

                const [existing] = await seq.query('SELECT id FROM "Media" WHERE "r2Key" = :key OR "tempKey" = :filename', {
                    replacements: { key, filename }
                });

                if (existing.length === 0) {
                    await seq.query(
                        'INSERT INTO "Media" (id, url, "r2Key", "tempKey", filename, type, "uploadStatus", "createdAt", "updatedAt") VALUES (:id, :url, :r2Key, :tempKey, :filename, \'image\', \'completed\', NOW(), NOW())',
                        { replacements: { id: crypto.randomUUID(), url: avatar, r2Key: key, tempKey: filename, filename: filename } }
                    );
                    mediaCount++;
                }
            }
        }
        console.log(`Created ${mediaCount} new mappings in Media table.`);

        // 3. Sync Notifications
        console.log('Syncing Notifications...');
        let updatedNotifs = 0;
        for (const [userId, { avatar, username }] of userMap.entries()) {
            if (avatar) {
                await seq.query(
                    'UPDATE notifications SET from_user_avatar = :avatar, from_username = :username WHERE from_user_id = :userId',
                    { replacements: { avatar, username, userId } }
                );
                await seq.query(
                    'UPDATE notifications SET from_user_avatar = :avatar WHERE from_username = :username AND from_user_id IS NULL',
                    { replacements: { avatar, username } }
                );
                updatedNotifs++;
            }
        }
        console.log(`Synced notifications for ${updatedNotifs} users.`);

        // 4. Rebuild Search Index Metadata
        console.log('Rebuilding SearchIndex metadata...');
        let searchCount = 0;
        const [searchRecords] = await seq.query('SELECT id, "referenceId", metadata FROM "SearchIndices" WHERE type = \'USER\'');
        for (const record of searchRecords) {
            const userId = parseInt(record.referenceId);
            if (userMap.has(userId)) {
                const { avatar, username } = userMap.get(userId);
                const metadata = record.metadata || {};
                const newMetadata = {
                    ...metadata,
                    avatar: avatar,
                    avatarUrl: avatar,
                    profilePicture: avatar,
                    username: username
                };
                await seq.query(
                    'UPDATE "SearchIndices" SET metadata = :metadata WHERE id = :id',
                    { replacements: { metadata: JSON.stringify(newMetadata), id: record.id } }
                );
                searchCount++;
            }
        }
        console.log(`Rebuilt metadata for ${searchCount} SearchIndex entries.`);

        console.log('\n✅ Consistency Sync Complete.');

    } catch (err) {
        console.error('Error during ultimate sync:', err.message);
    } finally {
        await seq.close();
    }
}

ultimateSync();
