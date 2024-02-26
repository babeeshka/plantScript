import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import monk, { IMonkManager } from 'monk';
import { PlantDetails } from '../models/plantInterfaces';
import { mockPlantDetails } from './mockData'; // Ensure this is correctly imported

dotenv.config({ path: './.env.test' });

// Define a type for the global variables we're going to set
declare global {
  namespace NodeJS {
    interface Global {
      __MONGOD__: MongoMemoryServer;
      __MONGO_URI__: string;
    }
  }
}

async function seedDatabase(db: IMonkManager) {
  const plantsCollection = db.get<PlantDetails>('plants');
  await plantsCollection.insert([mockPlantDetails]);
  console.log('Test database seeded.');
}

const globalSetup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  const db = monk(mongoUri);

  (global as unknown as NodeJS.Global & { __MONGOD__: MongoMemoryServer; __MONGO_URI__: string }).__MONGOD__ = mongoServer;
  (global as unknown as NodeJS.Global & { __MONGOD__: MongoMemoryServer; __MONGO_URI__: string }).__MONGO_URI__ = mongoUri;

  try {
    await seedDatabase(db);
  } catch (error) {
    console.error('Error during global setup:', error);
    await db.close();
    await mongoServer.stop();
    throw error; // Rethrow to prevent tests from running
  } finally {
    await db.close(); // Ensure the database connection is closed
  }
};

export default globalSetup;
