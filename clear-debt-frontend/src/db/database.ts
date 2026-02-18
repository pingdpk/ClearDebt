import { openDatabaseAsync } from "expo-sqlite";
import type { DebtSummary } from "../types/models";

let dbPromise: ReturnType<typeof openDatabaseAsync> | null = null;

async function getDB() {
    if(!dbPromise) dbPromise = openDatabaseAsync("cleardebt.db");
    return dbPromise;
}

export async function initDb(): Promise<void> {
    const db = await getDB();

    //Enable FK
    await db.execAsync("PRAGMA foreign_keys = ON;");

      // TEMP DEV RESET (run once, then remove)
  await db.execAsync(`DROP TABLE IF EXISTS transactions;`);
  await db.execAsync(`DROP TABLE IF EXISTS people;`);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
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

    const rows = await db.getAllAsync<{ c: number }>(
        "SELECT COUNT(*) as c FROM people"
    );

    if ((rows[0]?.c ?? 0) === 0){
        const now = new Date().toISOString();

    // Insert people one-by-one (more reliable)
    await db.runAsync(`INSERT INTO people (name, created_at) VALUES (?, ?);`, ["Alex", now]);
    await db.runAsync(`INSERT INTO people (name, created_at) VALUES (?, ?);`, ["Sara", now]);
    await db.runAsync(`INSERT INTO people (name, created_at) VALUES (?, ?);`, ["John", now]);

    // Insert a few transactions
    await db.runAsync(
      `INSERT INTO transactions (person_id, type, amount_cents, currency, payment_mode, date, note, created_at)
       VALUES ((SELECT id FROM people WHERE name=?), ?, ?, ?, ?, ?, ?, ?);`,
      ["Alex", "THEY_OWE", 12000, "EUR", "Cash", now, "Lunch", now]
    );

    await db.runAsync(
      `INSERT INTO transactions (person_id, type, amount_cents, currency, payment_mode, date, note, created_at)
       VALUES ((SELECT id FROM people WHERE name=?), ?, ?, ?, ?, ?, ?, ?);`,
      ["Sara", "I_OWE", 5000, "EUR", "Bank Transfer", now, "Taxi", now]
    );
    }
}

export async function getDebtSummaries(): Promise<DebtSummary[]> {
    const db = await getDB();

    const rows = await db.getAllAsync<DebtSummary>(`
            SELECT
                p.name as person,
                
                COALESCE(SUM(
                    CASE t.type
                        WHEN 'THEY_OWE' THEN t.amount_cents
                        WHEN 'I_OWE' THEN -t.amount_cents
                    END
                ), 0) as netCents,

                COALESCE(MAX(t.currency), 'EUR') as currency,
                COALESCE(MAX(t.date), p.created_at) as updatedAt

            FROM people p
            LEFT JOIN transactions t ON t.person_id = p.id
            GROUP BY p.id
            ORDER BY updatedAt DESC;
        `);

        return rows;
}