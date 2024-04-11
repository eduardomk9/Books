import { IBooks } from "./IBooks";

export interface SearchBookResponse {
    status: number;
    data: IBooks[] | any;
  }