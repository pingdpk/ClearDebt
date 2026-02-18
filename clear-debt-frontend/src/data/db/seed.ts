import { getDb } from "./db";

export async function seedDatabase(): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();

  console.log("🌱 Seeding database...");

  // Clear existing data (dev only)
  await db.execAsync(`DELETE FROM transactions;`);
  await db.execAsync(`DELETE FROM people;`);

  // Insert people
  const people = ["Alex", "Sara", "John", "Michael", "Priya"];

  for (const name of people) {
    await db.runAsync(
      `INSERT INTO people (name, created_at) VALUES (?, ?);`,
      [name, now]
    );
  }

  // Helper to get person id
  async function getPersonId(name: string): Promise<number> {
    const rows = await db.getAllAsync<{ id: number }>(
      `SELECT id FROM people WHERE name = ?;`,
      [name]
    );
    return rows[0].id;
  }

  // Transactions
  const transactions = [
    // Alex
    { name: "Alex", type: "THEY_OWE", amount: 12000, currency: "EUR", mode: "Cash", note: "Lunch" },
    { name: "Alex", type: "THEY_OWE", amount: 5000, currency: "USD", mode: "Card", note: "Taxi" },

    // Sara
    { name: "Sara", type: "I_OWE", amount: 7500, currency: "EUR", mode: "Bank Transfer", note: "Dinner" },

    // John
    { name: "John", type: "THEY_OWE", amount: 20000, currency: "AED", mode: "Cash", note: "Trip advance" },
    { name: "John", type: "I_OWE", amount: 3000, currency: "AED", mode: "UPI", note: "Snacks" },

    // Priya
    { name: "Priya", type: "THEY_OWE", amount: 15000, currency: "INR", mode: "Cash", note: "Tickets" },
  ];

  for (const t of transactions) {
    const personId = await getPersonId(t.name);

    await db.runAsync(
      `INSERT INTO transactions
        (person_id, type, amount_cents, currency, payment_mode, date, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        personId,
        t.type,
        t.amount,
        t.currency,
        t.mode,
        now,
        t.note,
        now,
      ]
    );
  }

  console.log("✅ Database seeded successfully.");
}