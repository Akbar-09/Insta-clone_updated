const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:aspire123@localhost:5432/instagram', {
    logging: false
});

async function check() {
    try {
        const results = await sequelize.query(`
            SELECT 
                to_char("createdAt", 'Mon') as month, 
                count(*) as count, 
                min("createdAt") as first_date,
                max("createdAt") as last_date 
            FROM "Posts" 
            WHERE extract(year from "createdAt") = 2026 
            GROUP BY to_char("createdAt", 'Mon') 
            ORDER BY min("createdAt")
        `);
        console.log(results[0]);
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

check();
