import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import monk, { IMonkManager } from 'monk';
import { mockPlantDetails } from './mockData'; 
dotenv.config({ path: './.env.test' });

// Make sure to type the 'db' parameter explicitly
async function seedDatabase(db: IMonkManager) {
  await db.get('plants').insert(mockPlantDetails);
  console.log('Test database seeded.');
}

const globalSetup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  const db = monk(mongoUri);

  // Type assertion for custom global variables
  (global as any).__MONGOD__ = mongoServer;
  (global as any).__MONGO_URI__ = mongoUri;

  try {
    await seedDatabase(db);
  } catch (error) {
    console.error('Error during global setup:', error);
    await db.close();
    await mongoServer.stop();
    throw error; // Rethrow to prevent tests from running
  } finally {
    await db.close();
  }
};

export default globalSetup;
