// jest.setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.DB_URI = mongoServer.getUri();
});

afterAll(async () => {
  await mongoServer.stop();
});