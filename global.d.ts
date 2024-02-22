// global.d.ts
declare namespace NodeJS {
    interface Global {
      mockAxios: any; // Preferably, use a more specific type than `any` if available.
    }
  }