export interface Card {
    id?: number;
    number?: string | null;
    cvv?: string;
    expiryDate: Date | null;
    type: string;
}