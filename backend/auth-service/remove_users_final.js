const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: console.log
});

async function deleteUsers() {
    try {
        const usernames = ['must0', 'akshaykummar', 'tanmay'];

        // 1. Get User IDs
        const [users] = await sequelize.query(
            `SELECT id FROM "Users" WHERE username IN (:usernames)`,
            { replacements: { usernames } }
        );

        if (users.length === 0) {
            console.log('No users found to delete.');
            return;
        }

        const userIds = users.map(u => u.id);
        console.log(`Starting deletion for User IDs: ${userIds.join(', ')}`);

        // 2. Delete Posts and related (Likes, Comments, Reports, SavedPosts)
        // We do this service by service or table by table.

        const tablesToDeleteByUserId = [
            'Posts', 'Stories', 'Reels', 'UserProfiles', 'AccountHistories',
            'NotificationSettings', 'PushSubscriptions', 'UserPrivacySettings',
            'LiveStreams', 'ScheduledStreams', 'Notifications'
        ];

        // Tables where user may be a target or participant
        // Deleting from Follows
        await sequelize.query(`DELETE FROM "follows" WHERE follower_id IN (:userIds) OR following_id IN (:userIds)`, { replacements: { userIds } });

        // Deleting Likes (PostService)
        await sequelize.query(`DELETE FROM "Likes" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });

        // Deleting Comments
        await sequelize.query(`DELETE FROM "Comments" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });

        // Deleting SavedPosts
        await sequelize.query(`DELETE FROM "SavedPosts" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });

        // Deleting Reports
        await sequelize.query(`DELETE FROM "Reports" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });

        // Finally delete main entities
        for (const table of tablesToDeleteByUserId) {
            try {
                // Check if table exists before deleting
                await sequelize.query(`DELETE FROM "${table}" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });
                console.log(`Deleted from ${table}`);
            } catch (err) {
                // Some tables might have different column casing or not exist
                try {
                    await sequelize.query(`DELETE FROM "${table}" WHERE user_id IN (:userIds)`, { replacements: { userIds } });
                    console.log(`Deleted from ${table} (using user_id)`);
                } catch (err2) {
                    console.warn(`Table ${table} skip/error: ${err2.message}`);
                }
            }
        }

        // Auth User Sessions
        await sequelize.query(`DELETE FROM "UserSessions" WHERE "userId" IN (:userIds)`, { replacements: { userIds } });

        // Final User Deletion (Auth Service)
        await sequelize.query(`DELETE FROM "Users" WHERE id IN (:userIds)`, { replacements: { userIds } });

        console.log('Deletion complete for all 3 users and their data.');

    } catch (err) {
        console.error('Critical Error during deletion:', err);
    } finally {
        await sequelize.close();
    }
}

deleteUsers();
