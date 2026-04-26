import * as SQLite from "expo-sqlite";

export async function openDb() {
  const db = await SQLite.openDatabaseAsync("Password.db");
}
