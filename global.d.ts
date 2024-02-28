// global.d.ts
declare namespace NodeJS {
  interface Global {
    __MONGOD__: import('mongodb-memory-server').MongoMemoryServer;
    __MONGO_URI__?: string;
    __MONGO_DB_NAME__?: string;
  }
}

export { };