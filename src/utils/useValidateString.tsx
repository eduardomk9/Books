import { isValidPhoneNumber } from "libphonenumber-js";

export const useValidateString = () => {
  function validateEmail(email: string): boolean {
    // Expressão regular para validar um email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function validatePhoneNumber(phone: string): boolean {
    return isValidPhoneNumber(phone);
  }
  return { validateEmail, validatePhoneNumber };
};
