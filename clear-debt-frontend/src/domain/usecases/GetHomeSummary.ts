import type { DebtRepository } from "../repositories/DebtRepository";
import type { DebtSummary } from "../models/Debt";

export class GetHomeSummary {
    constructor(private readonly repo: DebtRepository){}

    async execute(): Promise<DebtSummary[]>{
        return this.repo.getDebtSummaries();
    }
}