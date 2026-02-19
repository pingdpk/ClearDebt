import * as Contacts from "expo-contacts";
import type { ContactsRepository } from "../../domain/repositories/ContactsRepository";
import type { ImportedContact } from "../../domain/models/Contact";

export class ExpoContactsRepository implements ContactsRepository {
  async requestReadPermission(): Promise<"granted" | "denied"> {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === "granted" ? "granted" : "denied";
  }

  async getContacts(): Promise<ImportedContact[]> {
    const res = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      pageSize: 2000
    });

    return (res.data ?? [])
      .map((c) => {
        const phone = c.phoneNumbers?.[0]?.number ?? null;
        const email = c.emails?.[0]?.email ?? null;

        const displayName =
          c.name ??
          [c.firstName, c.lastName].filter(Boolean).join(" ").trim() ??
          "Unknown";

        return { displayName, phone, email };
      })
      .filter((c) => c.displayName && c.displayName !== "Unknown");
  }
}