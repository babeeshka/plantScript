// globalTeardown.ts
import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  await MongoMemoryServer.prototype.stop();
};

module.exports = async () => {
  const instance = new MongoMemoryServer();
  await instance.stop();
};