const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
async function listConstraints() {
    try {
        const [results] = await sequelize.query(`
            SELECT 
                conname AS constraint_name, 
                conrelid::regclass AS table_name, 
                confrelid::regclass AS referenced_table,
                contype
            FROM pg_constraint 
            WHERE confrelid = '"Users"'::regclass;
        `);
        console.log('Tables referencing Users:', results);
    } catch (err) {
        console.error(err.message);
    } finally {
        await sequelize.close();
    }
}
listConstraints();
