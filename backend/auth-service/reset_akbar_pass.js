const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5433
});

const bcrypt = require('bcrypt');

async function resetPassword() {
    try {
        await client.connect();
        const PASSWORD_HASH = await bcrypt.hash('password123', 10);
        const res = await client.query('UPDATE "Users" SET password = $1 WHERE email = \'akbar@example.com\' OR username = \'akbar\'', [PASSWORD_HASH]);
        if (res.rowCount > 0) {
            console.log('Password reset successfully to: password123');
        } else {
            console.log('User not found.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

resetPassword();
