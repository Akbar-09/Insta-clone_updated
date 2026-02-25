/**
 * sync_comment_counts.js
 * 
 * Recalculates the commentsCount for Posts and Reels based on the actual rows in the Comments table.
 */
require('dotenv').config();
const { Client } = require('pg');

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5433,
};

async function run() {
    const client = new Client(dbConfig);
    await client.connect();
    console.log('Connected to database.');

    // Sync Posts
    console.log('Syncing Posts comment counts...');
    await client.query(`
        UPDATE "Posts" p
        SET "commentsCount" = (
            SELECT count(*) 
            FROM "Comments" c 
            WHERE c."postId" = p.id
        )
    `);

    // Sync Reels
    console.log('Syncing Reels comment counts...');
    await client.query(`
        UPDATE "Reels" r
        SET "commentsCount" = (
            SELECT count(*) 
            FROM "Comments" c 
            WHERE c."postId" = r.id
        )
    `);

    console.log('Sync complete.');
    await client.end();
}

run().catch(console.error);
