export const useFormatMessage = () => {
  const errorMessage = (error: string): string => {
    const errors = JSON.stringify(error);
    if (errors.includes("ERR_NETWORK")) return "Serviço Indisponível";
    if (errors.includes("UNIQUE KEY")) return "Duplicado";
    if (errors.includes("Invalid email or password"))
      return "E-mail ou senha inválidos";
    if (errors.includes("User not found")) return "Utilizador não encontrado";
    if (errors.includes("Inactive user")) return "Utilizador inativo";
    if (errors.includes("not found")) return "Não encontrado";
    if (errors.includes("Is already registered")) return "Já está registrado";
    return "Oops!";
  };

  return { errorMessage };
};
