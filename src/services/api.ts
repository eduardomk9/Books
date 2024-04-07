import axios, { AxiosInstance } from "axios";
import { IToken } from "./interfaces/IToken";

const useApi = (onAuthError: () => void) => {
  const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const tokenString = localStorage.getItem("token");
    const token: IToken | null = tokenString ? JSON.parse(tokenString) : null;
    if (token) {
      config.headers.Authorization = `${token.tokenType} ${token.accessToken}`;
    }
    config.headers["Token"] = process.env.REACT_APP_API_TOKEN;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        localStorage.removeItem("organization");
        onAuthError(); // Chama a função de callback para navegar para a tela de login
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
