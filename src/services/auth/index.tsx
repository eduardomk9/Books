/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";

import useApi from "../api";
import { ISignInResponse } from "./interfaces/ISignInResponse";
import { IApiResponse } from "../interfaces/IApiResponse";
import { useFormatMessage } from "../../utils/useFormatMessage";
import { IAuth } from "./interfaces/IAuth";
import { IToken } from "../interfaces/IToken";

export const useAuthService = () => {
  const onAuthError = () => {
    // TODO
  };
  const api = useApi(onAuthError);
  
  const { errorMessage } = useFormatMessage();

  async function getAuth(): Promise<IApiResponse<IAuth[] | any>> {
    try {
      const response = await api.get("/Auth");
      return { status: response.status, data: response.data };
    } catch (error: AxiosError | any) {
      if (error.code === "ERR_NETWORK") {
        return {
          status: 503,
          data: errorMessage("ERR_NETWORK"),
        };
      }
      return {
        status: error.response.data.status,
        data: errorMessage(error.response.data),
      };
    }
  }
  
  const signIn = async (credentials: { mail: string; password: string }): Promise<IToken> => {
    try {
      const response = await api.post('/auth/signin', credentials);
      const data: ISignInResponse = response.data;
      const { token } = data;
      localStorage.setItem('token', JSON.stringify(token));
      return token;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to sign in');
    }
  };

  return {
    getAuth,
    signIn,
  };
};
