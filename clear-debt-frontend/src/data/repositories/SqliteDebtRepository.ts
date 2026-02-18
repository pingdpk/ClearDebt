import type { DebtRepository } from "../../domain/repositories/DebtRepository";
import type { DebtSummary } from "../../domain/models/Debt";
import { getDb } from "../db/db";

export class SqliteDebtRepository implements DebtRepository {
  async getDebtSummaries(): Promise<DebtSummary[]> {
    const db = await getDb();

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
}