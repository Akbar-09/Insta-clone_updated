const bcrypt = require('bcrypt');

const PASSWORD_HASH = '$2b$10$EgpG4YCuzFaPXspg930xX.uuX9Gf62.TObKxYvO7X7whSANwlfUL/e'; // 'password123'
const rawPassword = 'password123';

async function test() {
    const isMatch = await bcrypt.compare(rawPassword, PASSWORD_HASH);
    console.log(`Password match: ${isMatch}`);
}

test();
