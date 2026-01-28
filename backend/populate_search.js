const { Client } = require('pg');

const DB_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
};

const client = new Client(DB_CONFIG);

async function populateSearch() {
    try {
        await client.connect();
        console.log('Connected to database.');

        // 1. Clear existing SearchIndices for USER type
        await client.query(`DELETE FROM "SearchIndices" WHERE "type" = 'USER'`);
        console.log('Cleared existing User search indices.');

        // 2. Fetch UserProfiles
        const res = await client.query(`SELECT "userId", "username", "fullName", "profilePicture" FROM "UserProfiles"`);
        const users = res.rows;
        console.log(`Found ${users.length} users to index.`);

        // 3. Insert into SearchIndices
        let count = 0;
        for (const user of users) {
            const metadata = {
                fullName: user.fullName,
                profilePicture: user.profilePicture
            };

            await client.query(
                `INSERT INTO "SearchIndices" ("type", "referenceId", "content", "metadata", "createdAt", "updatedAt")
                 VALUES ('USER', $1, $2, $3, NOW(), NOW())`,
                [user.userId, user.username, JSON.stringify(metadata)]
            );
            count++;
        }

        console.log(`Successfully indexed ${count} users.`);

    } catch (err) {
        console.error('Error populating search index:', err);
    } finally {
        await client.end();
    }
}

populateSearch();
