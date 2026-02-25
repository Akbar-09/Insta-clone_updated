const { Client } = require('pg');
const client = new Client({
    user: 'postgres', host: 'localhost', database: 'instagram', password: 'aspire123', port: 5433
});

async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM "Posts" WHERE id = 1858');
        console.log("Post 1858 Data:");
        console.log(JSON.stringify(res.rows, null, 2));

        const mediaUrl = res.rows[0]?.mediaUrl;
        if (mediaUrl) {
            console.log("\nSearching for Media records matching this URL:");
            const fileName = mediaUrl.split('/').pop();
            const mediaRes = await client.query('SELECT * FROM "Media" WHERE "url" LIKE $1 OR "r2Key" LIKE $1 OR "filename" LIKE $1', [`%${fileName}%`]);
            console.log(JSON.stringify(mediaRes.rows, null, 2));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
check();
