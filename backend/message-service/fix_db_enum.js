const sequelize = require('./config/database');

async function fixEnum() {
    try {
        console.log('Attempting to add call_history to enum_Messages_type...');
        // Postgres requires adding each value in a separate command if not in a transaction,
        // but Sequelize query usually works if we don't use transactions for this.
        await sequelize.query('ALTER TYPE "enum_Messages_type" ADD VALUE IF NOT EXISTS \'call_history\'');
        console.log('Successfully added call_history');

        console.log('Checking for call_type column...');
        const [columns] = await sequelize.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Messages' AND column_name = 'call_type'
        `);

        if (columns.length === 0) {
            console.log('Adding call_type column...');
            await sequelize.query('ALTER TABLE "Messages" ADD COLUMN "call_type" "enum_Messages_callType"');
            console.log('Successfully added call_type column');
        } else {
            console.log('call_type column already exists');
        }
    } catch (e) {
        console.error('Error fixing DB:', e.message);
        if (e.message.includes('enum_Messages_callType" does not exist')) {
            console.log('Creating enum_Messages_callType...');
            await sequelize.query('CREATE TYPE "enum_Messages_callType" AS ENUM (\'audio\', \'video\')');
            await sequelize.query('ALTER TABLE "Messages" ADD COLUMN "call_type" "enum_Messages_callType"');
            console.log('Successfully created type and column');
        }
    } finally {
        process.exit();
    }
}

fixEnum();
