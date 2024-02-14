// server/jest.setup.js
import dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

// debug: print the MongoDB URI
console.log('MongoDB URI:', process.env.MONGODB_URI);
