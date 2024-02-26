// tests/globalTeardown.ts
module.exports = async () => {
    await global.__MONGOD__.stop();
  };
  