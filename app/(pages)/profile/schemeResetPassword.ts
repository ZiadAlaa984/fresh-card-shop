import { z } from "zod";

// Define the form schema with Zod
export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Current password must be at least 6 characters",
    }),
    password: z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),
    rePassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

// Infer the type from the schema
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
