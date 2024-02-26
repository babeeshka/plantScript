// jest.setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var __MONGOD__: MongoMemoryServer;
}

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.DB_URI = mongoServer.getUri();
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
});