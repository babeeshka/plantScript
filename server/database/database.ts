import monk from 'monk';
import dotenv from 'dotenv';

dotenv.config();

// Ensure that MONGODB_URI is defined
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mylocaldb';

const db = monk(MONGODB_URI);

db.then(() => {
  console.log('Connected correctly to MongoDB server using Monk');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

export default db;
