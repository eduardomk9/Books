/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";

import useApi from "../api";
import { ISignInResponse } from "./interfaces/ISignInResponse";
import { ISignIn } from "./interfaces/ISignIn";
import { IApiResponse } from "../interfaces/IApiResponse";
import { useFormatMessage } from "../../utils/useFormatMessage";
import { ISignUp } from "./interfaces/ISignUp";
import { IAuth } from "./interfaces/IAuth";
import { IUser } from "../user/interfaces/IUser";

export const useAuthService = () => {
  const onAuthError = () => {
    // Aqui você pode definir o comportamento desejado quando ocorrer um erro de autenticação
    // Por exemplo, redirecionar para a tela de login
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

  async function signIn(
    model: ISignIn
  ): Promise<IApiResponse<ISignInResponse | any>> {
    try {
      const response = await api.post("/Auth/SignIn", model);
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

  async function signUp(model: ISignUp): Promise<IApiResponse<IUser | any>> {
    try {
      const response = await api.post("/Auth/SignUp", model);
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

  return {
    getAuth,
    signIn,
    signUp,
  };
};
