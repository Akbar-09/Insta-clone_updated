const authDb = require('./auth-service/config/database');
const userDb = require('./user-service/config/database');
const { DataTypes } = require('./user-service/node_modules/sequelize');

async function migrate() {
    try {
        await authDb.authenticate();
        await userDb.authenticate();

        console.log("Connected to DBs");

        // 1. Add accountType to User model / Users table if not exists
        try {
            await authDb.query("ALTER TABLE \"Users\" ADD COLUMN \"accountType\" VARCHAR(50) DEFAULT 'personal';");
            console.log("Added accountType to Users");
        } catch (e) {
            console.log("accountType might already exist or error: ", e.message);
        }

        // 2. Add accountType to UserProfiles just in case, or we use Auth Service's User table. 
        // User requirements say "Update users table", "Add column: account_type". We will also add it to UserProfiles to easily serve it without querying auth service always.
        try {
            await userDb.query("ALTER TABLE \"UserProfiles\" ADD COLUMN \"accountType\" VARCHAR(50) DEFAULT 'personal';");
            console.log("Added accountType to UserProfiles");
        } catch (e) {
            console.log("accountType might already exist in UserProfiles. Error: ", e.message);
        }

        // 3. Create AccountProfiles table
        await userDb.query(`
            CREATE TABLE IF NOT EXISTS "AccountProfiles" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER UNIQUE NOT NULL,
                "category" VARCHAR(255),
                "business_email" VARCHAR(255),
                "business_phone" VARCHAR(255),
                "business_address" TEXT,
                "website" VARCHAR(255),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Created AccountProfiles table");

        // 4. Create AccountCategories table
        await userDb.query(`
            CREATE TABLE IF NOT EXISTS "AccountCategories" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255),
                "type" VARCHAR(50),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Created AccountCategories table");

        // Populate Categories
        const categories = [
            ['Fitness Trainer', 'creator'],
            ['Photographer', 'creator'],
            ['Artist', 'creator'],
            ['Musician', 'creator'],
            ['Chef', 'creator'],
            ['Fashion Designer', 'creator'],
            ['Gamer', 'creator'],
            ['Public Figure', 'creator'],
            ['Brand', 'business'],
            ['Restaurant', 'business'],
            ['Shop', 'business'],
            ['Startup', 'business']
        ];

        for (const [name, type] of categories) {
            try {
                await userDb.query(`INSERT INTO "AccountCategories" ("name", "type") VALUES ('${name}', '${type}') ON CONFLICT DO NOTHING;`);
            } catch (e) { }
        }

        // 5. Create AccountAnalytics table
        await userDb.query(`
            CREATE TABLE IF NOT EXISTS "AccountAnalytics" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL,
                "profile_views" INTEGER DEFAULT 0,
                "post_reach" INTEGER DEFAULT 0,
                "engagement" DECIMAL DEFAULT 0.0,
                "followers_growth" INTEGER DEFAULT 0,
                "recorded_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Created AccountAnalytics table");

        console.log("Migration completed");
        process.exit(0);

    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
