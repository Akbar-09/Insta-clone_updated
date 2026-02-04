const sequelize = require('./config/database');

async function check() {
    try {
        const [results] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'Reports';
        `);
        console.log('Columns in Reports table:');
        console.log(results);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await sequelize.close();
    }
}
check();
