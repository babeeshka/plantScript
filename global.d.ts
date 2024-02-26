declare global {
  namespace NodeJS {
    interface Global {
      __MONGOD__: MongoMemoryServer;
      __MONGO_URI__?: string;
    }
  }
}

export {};