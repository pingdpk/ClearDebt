import { SqliteDebtRepository } from "../../data/repositories/SqliteDebtRepository";
import { GetHomeSummary } from "../../domain/usecases/GetHomeSummary";
import { ExpoContactsRepository } from "../../data/repositories/ExpoContactsRepository";
import { SqlitePeopleRepository } from "../../data/repositories/SqlitePeopleRepository";
import { GetDeviceContacts } from "../../domain/usecases/GetDeviceContacts";
import { ImportContactToDb } from "../../domain/usecases/ImportContactToDb";

const debtRepo = new SqliteDebtRepository();
const contactsRepo = new ExpoContactsRepository();
const peopleRepo = new SqlitePeopleRepository();

export const container = {
  usecases: {
    getHomeSummary: new GetHomeSummary(debtRepo),
    getDeviceContacts: new GetDeviceContacts(contactsRepo),
    importContactToDb: new ImportContactToDb(peopleRepo)
  }
};