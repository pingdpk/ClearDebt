import type { PeopleRepository } from "../../domain/repositories/PeopleRepository";
import type { ImportedContact } from "../../domain/models/Contact";
import { getDb } from "../db/db";

export class SqlitePeopleRepository implements PeopleRepository {
  async upsertFromContact(contact: ImportedContact): Promise<void> {
    const db = await getDb();
    const now = new Date().toISOString();

    const phone = contact.phone?.trim() || null;
    const email = contact.email?.trim() || null;
    const name = contact.displayName.trim();

    // Dedup priority: phone > email > name
    if (phone) {
      const exists = await db.getAllAsync<{ id: number }>(
        `SELECT id FROM people WHERE phone = ? LIMIT 1;`,
        [phone]
      );
      if (exists.length) return;
    } else if (email) {
      const exists = await db.getAllAsync<{ id: number }>(
        `SELECT id FROM people WHERE email = ? LIMIT 1;`,
        [email]
      );
      if (exists.length) return;
    } else {
      const exists = await db.getAllAsync<{ id: number }>(
        `SELECT id FROM people WHERE name = ? LIMIT 1;`,
        [name]
      );
      if (exists.length) return;
    }

    await db.runAsync(
      `INSERT INTO people (name, phone, email, created_at) VALUES (?, ?, ?, ?);`,
      [name, phone, email, now]
    );
  }
}