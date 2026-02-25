const { Sequelize } = require('sequelize');

async function checkPorts() {
    const ports = [5432, 5433];
    for (const port of ports) {
        console.log(`--- Checking Port ${port} ---`);
        const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
            host: 'localhost',
            port: port,
            dialect: 'postgres',
            logging: false
        });

        try {
            await sequelize.authenticate();
            console.log(`Connected to Port ${port}`);

            const [postsCount] = await sequelize.query('SELECT COUNT(*) FROM "Posts"');
            const [maxId] = await sequelize.query('SELECT MAX(id) FROM "Posts"');
            const [mediaCount] = await sequelize.query('SELECT COUNT(*) FROM "Media"');

            console.log(`Posts Count: ${postsCount[0].count}`);
            console.log(`Max Post ID: ${maxId[0].max}`);
            console.log(`Media Count: ${mediaCount[0].count}`);

            if (maxId[0].max >= 2080) {
                console.log(`>> Bingo! The data for IDs 2081-2086 is on Port ${port}`);
            }

        } catch (error) {
            console.log(`Port ${port} Error: ${error.message}`);
        } finally {
            await sequelize.close();
        }
        console.log('');
    }
}

checkPorts();
