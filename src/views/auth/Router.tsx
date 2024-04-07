import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./LoginPage"; // Assuming AuthPage is in the same directory

const useAuthRoutes = () => {
  const navigate = useNavigate(); // Obtenha a função navigate aqui

  const routers = React.useMemo(
    () => [
      {
        path: "/",
        element: <AuthPage navigate={navigate} />, // Passe navigate para AuthPage
      },
      {
        path: "/auth",
        element: <AuthPage navigate={navigate} />, // Passe navigate para AuthPage
      },
    ],
    [navigate] // Certifique-se de incluir navigate como dependência para que ele seja atualizado quando mudar
  );

  return routers;
};

export default useAuthRoutes;
