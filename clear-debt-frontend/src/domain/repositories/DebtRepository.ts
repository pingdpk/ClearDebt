import type { DebtSummary } from "../models/Debt";

export interface DebtRepository {
    getDebtSummaries(): Promise<DebtSummary[]>;
}