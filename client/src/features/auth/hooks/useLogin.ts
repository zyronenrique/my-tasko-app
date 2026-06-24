import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginSchema, type LoginFormData } from "../../schemas/login.schema";
import { useLogin as loginMutation } from "../../../hooks/useAuth";

export function useLogin() {
  const loginM = loginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    loginM.mutate(data);
  });
  return {
    form,
    onSubmit,
    showPassword,
    setShowPassword,
    isPending: loginM.isPending,
    serverError:
      loginM.isError
        ? "Invalid email or password"
        : "",
  };
}
