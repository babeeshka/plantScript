// server/database/database.ts
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // Make sure this path is correct based on your project structure
import { Db, ObjectId } from 'mongodb';
import { PlantDetails } from '../models/plantInterfaces';

import monk from 'monk';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mylocaldb';
console.log(`Attempting to connect to MongoDB with URI: ${MONGODB_URI}`);

const db = monk(MONGODB_URI);
const plants = db.get('plants');

export const findPlantByApiId = async (id: number) => {
  const plantsCollection = db.get('plants');
  return await plantsCollection.findOne({ id: id });
};

db.then(() => {
  console.log('Successfully connected to MongoDB server using Monk');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
db.on('open', () => console.log('Database connection opened'));
db.on('error', err => console.error('Database connection error:', err));

export default db;
