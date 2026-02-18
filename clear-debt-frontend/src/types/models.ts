export type DebtSummary = {
    person: string,
    netCents: number,       // positive = they owe you, negative = you owe them (TODO: to change to amount)
    currency: string,       // e.g. "EUR"
    updatedAt: string       // ISO string
}