import type { ImportedContact } from "../models/Contact";

export interface PeopleRepository {
  upsertFromContact(contact: ImportedContact): Promise<void>;
}