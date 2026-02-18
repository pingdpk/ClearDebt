import { SqliteDebtRepository } from "../../data/repositories/SqliteDebtRepository";
import { GetHomeSummary } from "../../domain/usecases/GetHomeSummary";

const debtRepo = new SqliteDebtRepository();

export const container = {
  usecases: {
    getHomeSummary: new GetHomeSummary(debtRepo),
  },
};