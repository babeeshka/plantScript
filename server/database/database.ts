// server/database/database.ts
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // Make sure this path is correct based on your project structure

import monk from 'monk';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mylocaldb';
console.log(`Attempting to connect to MongoDB with URI: ${MONGODB_URI}`);

const db = monk(MONGODB_URI);

db.then(() => {
  console.log('Successfully connected to MongoDB server using Monk');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
db.on('open', () => console.log('Database connection opened.'));
db.on('error', err => console.error('Database connection error:', err));

export default db;
