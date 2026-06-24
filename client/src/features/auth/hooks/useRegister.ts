import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { registerSchema, type RegisterFormData } from '../../schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister as registerMutation } from '../../../hooks/useAuth';

export const useRegister = () => {
  const registerM = registerMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const password = useWatch({
    control: form.control,
    name: "password",
  });
  const onSubmit = form.handleSubmit((data) => {
    registerM.mutate({
      name: data.fullName,
      email: data.email,
      password: data.password,
    });
  });
  const passwordRequirements = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&]/.test(password),
  ];
  const allPasswordValid = passwordRequirements.every(Boolean);
  return {
    password,
    isPasswordFocused,
    showPassword,
    setShowPassword,
    setIsPasswordFocused,
    allPasswordValid,
    form,
    onSubmit,
    isPending: registerM.isPending,
    serverError:
      registerM.isError
        ? "Registration failed. Please try again!"
        : "",
  };
};
