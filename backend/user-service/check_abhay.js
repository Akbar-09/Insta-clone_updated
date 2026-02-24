const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query("SELECT \"userId\", username, \"profilePicture\" FROM \"UserProfiles\" WHERE username = 'Abhay90'");
        console.log("User Abhay90:");
        console.log(JSON.stringify(r, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
