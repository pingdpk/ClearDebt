import type { ContactsRepository } from "../repositories/ContactsRepository";
import type { ImportedContact } from "../models/Contact";

export class GetDeviceContacts {
  constructor(private readonly repo: ContactsRepository) {}

  async execute(): Promise<ImportedContact[]> {
    const perm = await this.repo.requestReadPermission();
    if (perm !== "granted") throw new Error("Contacts permission denied");
    return this.repo.getContacts();
  }
}