require('dotenv').config();
const { isConfigured } = require('./config/r2');

console.log('R2 Configuration Status:');
console.log('  isConfigured:', isConfigured);
console.log('  ACCOUNT_ID:', process.env.R2_ACCOUNT_ID ? 'Set' : 'Missing');
console.log('  ACCESS_KEY:', process.env.R2_ACCESS_KEY_ID ? 'Set' : 'Missing');
console.log('  SECRET_KEY:', process.env.R2_SECRET_ACCESS_KEY ? 'Set' : 'Missing');
console.log('  BUCKET_NAME:', process.env.R2_BUCKET_NAME);
