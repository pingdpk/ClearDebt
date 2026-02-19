import type { ImportedContact } from "../models/Contact";

export interface ContactsRepository {
  requestReadPermission(): Promise<"granted" | "denied">;
  getContacts(): Promise<ImportedContact[]>;
}