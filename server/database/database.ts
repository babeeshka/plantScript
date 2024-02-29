import monk from 'monk';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plantScriptDev';
const db = monk(MONGODB_URI);

db.then(() => console.log('Connected to MongoDB')).catch((err) => console.error('MongoDB connection error:', err));

export default db;