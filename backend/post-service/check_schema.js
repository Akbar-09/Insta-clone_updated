require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Show all tables
        const [tables] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Available tables:');
        tables.forEach(t => console.log('  -', t.table_name));
        console.log('');

        // Check if Bookmarks table exists and its structure
        try {
            const [columns] = await sequelize.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'Bookmarks'
            `);
            if (columns.length > 0) {
                console.log('Bookmarks table columns:');
                columns.forEach(c => console.log(`  - ${c.column_name}: ${c.data_type}`));
            } else {
                console.log('Bookmarks table not found or has no columns');
            }
        } catch (e) {
            console.log('Error checking Bookmarks:', e.message);
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
