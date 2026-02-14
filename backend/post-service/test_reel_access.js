const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = require('./config/database');
// Adjust path to point to sibling directory
const Reel = require('../../reel-service/models/Reel');

// Hack: Reel model imports its own sequelize instance.
// If they point to the same DB, we can validly query.
// But the model definition in Reel.js uses `require('../config/database')` relative to itself.
// So when we require it here, it will require `reel-service/config/database`.
// This is fine as long as both configs point to same DB.

async function testReelAccess() {
    try {
        await Reel.sequelize.authenticate(); // Use the sequelize instance attached to Reel model
        console.log('Reel DB connection accepted.');

        const count = await Reel.count();
        console.log(`Reels count: ${count}`);

        const reels = await Reel.findAll({ limit: 2, raw: true });
        console.log('Sample reels:', JSON.stringify(reels, null, 2));

    } catch (error) {
        console.error('Error accessing reels:', error);
    } finally {
        // We need to close the connection associated with Reel model
        await Reel.sequelize.close(); // Important!
    }
}

testReelAccess();
