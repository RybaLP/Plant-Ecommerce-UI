import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../api/loginAdmin";
import type { LoginForm } from "../interfaces/loginForm";

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: (reqBody: LoginForm) => loginAdmin(reqBody),
  });
};
