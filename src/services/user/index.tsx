/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";

import useApi from "../api";
import { IApiResponse } from "../interfaces/IApiResponse";
import { useFormatMessage } from "../../utils/useFormatMessage";
import { IUser } from "./interfaces/IUser";
import { IUserPhotoUpdate } from "./interfaces/IUserPhotoUpdate";
import { IProfile } from "../user/interfaces/IProfile";
import { IUserUpdatePassword } from "./interfaces/IUserUpdatePassword";
import { IUserCreateAndUpdate } from "./interfaces/IUserCreateAndUpdate";

export const useUserService = () => {
  
  const onAuthError = () => {
    // Aqui você pode definir o comportamento desejado quando ocorrer um erro de autenticação
    // Por exemplo, redirecionar para a tela de login
  };
  const api = useApi(onAuthError);
  const { errorMessage } = useFormatMessage();

  async function getUsers(): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.get(`/User`);
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

  async function getUser(id: any): Promise<IApiResponse<IUser | any>> {
    try {
      const response = await api.get(`/User/${id}`);
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

  async function getUserProfiles(): Promise<IApiResponse<IProfile[] | any>> {
    try {
      const response = await api.get(`/User/Profiles`);
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

  async function createUser(
    model: IUserCreateAndUpdate
  ): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.post(`/User`, model);
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

  async function updateUser(
    model: IUserCreateAndUpdate
  ): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.put(`/User`, model);
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

  async function deleteUser(
    islogical: boolean,
    id: any
  ): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.delete(`/User/${islogical}/${id}`);
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

  async function getUsersTrash(): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.get(`/User/Trash`);
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

  async function restoreUserTrash(
    id: any
  ): Promise<IApiResponse<IUser[] | any>> {
    try {
      const response = await api.put(`/User/RestoreTrash/${id}`);
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

  async function updateUserPhoto(
    model: IUserPhotoUpdate
  ): Promise<IApiResponse<any>> {
    try {
      const response = await api.put(`/User/Photo`, model);
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

  async function updateUserPassoword(
    model: IUserUpdatePassword
  ): Promise<IApiResponse<any>> {
    try {
      const response = await api.put(`/User/Password`, model);
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
    getUsers,
    getUser,
    getUserProfiles,
    createUser,
    updateUser,
    deleteUser,
    getUsersTrash,
    restoreUserTrash,
    updateUserPhoto,
    updateUserPassoword,
  };
};
