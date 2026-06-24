import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1)
    .max(30)
    .regex(
      /^[a-zA-Z\s]+$/,
      "Only letters and spaces are allowed"
    ),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/\d/, "Must contain a number")
    .regex(
      /[@$!%*?&]/,
      "Must contain a special character"
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
