const bcrypt = require('bcrypt');

async function gen() {
    const hash = await bcrypt.hash('password123', 10);
    console.log(`NEW_HASH: [${hash}]`);
}

gen();
