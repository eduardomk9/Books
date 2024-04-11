/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";

import useApi from "../api";
import { useFormatMessage } from "../../utils/useFormatMessage";
import { BookSearchModel } from "./interfaces/BookSearchModel";
import { SearchBookResponse } from "./interfaces/SearchBookResponse";
import { IBooks } from "./interfaces/IBooks";

export const useBookService = () => {
  
  const onAuthError = () => {
    // TODO
  };
  const api = useApi(onAuthError);
  const { errorMessage } = useFormatMessage();

  const getBooks = async (searchParams: BookSearchModel): Promise<IBooks[]> => {
    try {
      const response = await api.post('/book/GetBooks', searchParams);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to fetch books');
    }
  };

  return { getBooks };
};
