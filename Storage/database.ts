import * as SQLite from "expo-sqlite";

let dbInstance: any = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("passwords.db");
  }
  return dbInstance;
}

export { getDB };
