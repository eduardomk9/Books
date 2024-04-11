// AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../views/books/DashBoardPage"; // Importe o componente Dashboard aqui

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Rota para o Dashboard */}
        {/* Defina outras rotas do seu aplicativo aqui */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
