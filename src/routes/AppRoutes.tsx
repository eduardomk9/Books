// AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../views/auth/LoginPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage navigate={() => {}} />} />
        {/* Defina outras rotas do seu aplicativo aqui */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
