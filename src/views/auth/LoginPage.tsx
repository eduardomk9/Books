import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuthService } from "../../services/auth";
import { NavigateFunction } from "react-router-dom";

interface LoginPageProps {
  navigate: NavigateFunction;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuthService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await signIn({ username, password });
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/home", { replace: true });
      } else {
        console.error("Erro no login:", response.data);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
