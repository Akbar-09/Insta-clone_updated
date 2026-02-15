const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

async function migrate() {
    try {
        await sequelize.authenticate();
        const queryInterface = sequelize.getQueryInterface();

        // Add type ENUM if it doesn't exist
        try {
            await queryInterface.addColumn('Comments', 'type', {
                type: DataTypes.ENUM('text', 'sticker'),
                defaultValue: 'text'
            });
        } catch (e) {
            console.log('type column might already exist');
        }

        try {
            await queryInterface.addColumn('Comments', 'target_type', {
                type: DataTypes.ENUM('post', 'reel'),
                defaultValue: 'post'
            });
        } catch (e) {
            console.log('target_type column might already exist');
        }

        console.log('Migration complete');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
