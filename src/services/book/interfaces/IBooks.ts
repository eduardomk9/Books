export interface IBooks {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  totalCopies: number;
  copiesInUse: number;
  type?: string;
  isbn?: string;
  category?: string | null;
}
