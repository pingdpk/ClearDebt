import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

let db: SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLiteDatabase> {
  if (!db) db = await openDatabaseAsync("cleardebt.db");
  return db;
}