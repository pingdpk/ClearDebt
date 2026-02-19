import type { ImportedContact } from "../models/Contact";
import type { PeopleRepository } from "../repositories/PeopleRepository";

export class ImportContactToDb {
  constructor(private readonly peopleRepo: PeopleRepository) {}

  async execute(contact: ImportedContact): Promise<void> {
    await this.peopleRepo.upsertFromContact(contact);
  }
}