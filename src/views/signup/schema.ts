import { z } from "zod";

const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9]/;

export const signupFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be at most 40 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long")
    .superRefine((val, ctx) => {
      const missing: string[] = [];
      if (!/[a-z]/.test(val)) missing.push("lowercase letter");
      if (!/[A-Z]/.test(val)) missing.push("uppercase letter");
      if (!/\d/.test(val)) missing.push("number");
      if (!SPECIAL_CHAR_REGEX.test(val)) missing.push("special character");
      if (missing.length > 0) {
        ctx.addIssue(`Password must contain at least one ${missing.join(", one ")}`);
      }
    }),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
