import { getDb } from "./db";

export async function initSchema(): Promise<void> {
  const db = await getDb();
  await db.execAsync("PRAGMA foreign_keys = ON;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      phone TEXT,
      email TEXT,
      created_at TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      person_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('I_OWE','THEY_OWE')),
      amount_cents INTEGER NOT NULL CHECK(amount_cents > 0),
      currency TEXT NOT NULL,
      payment_mode TEXT,
      date TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(person_id) REFERENCES people(id) ON DELETE CASCADE
    );
  `);

  await db.execAsync(`CREATE INDEX IF NOT EXISTS idx_transactions_person ON transactions(person_id);`);
  await db.execAsync(`CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);`);
}