const sequelize = require('./config/database');

async function checkEnum() {
    try {
        const [results] = await sequelize.query(`
            SELECT enumlabel 
            FROM pg_enum 
            JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
            WHERE typname = 'enum_Messages_type';
        `);
        console.log('Enum values for Messages.type:', results.map(r => r.enumlabel));

        const [results2] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'Messages' AND column_name = 'call_type';
        `);
        console.log('Column call_type:', results2);
    } catch (e) {
        console.error('Error checking DB:', e);
    } finally {
        process.exit();
    }
}

checkEnum();
