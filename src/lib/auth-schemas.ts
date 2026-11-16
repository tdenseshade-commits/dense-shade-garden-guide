import { z } from "zod";

import { CALIFORNIA_REGIONS } from "./profile-options";

export const PASSWORD_MIN_LENGTH = 8;

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email.")
  .max(255, "That email is too long.")
  .email("Please enter a valid email address.");

const newPassword = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
  .max(72, "Use 72 characters or fewer.")
  .regex(/[A-Za-z]/, "Include at least one letter.")
  .regex(/[0-9]/, "Include at least one number.");

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Please enter your password."),
});

export const signUpSchema = z
  .object({ email, password: newPassword, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match.",
  });

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({ password: newPassword, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match.",
  });

const regionCodes = CALIFORNIA_REGIONS.map((r) => r.value) as [string, ...string[]];

export const preferencesSchema = z.object({
  displayName: z
    .string()
    .trim()
    .max(60, "Keep your name to 60 characters or fewer.")
    .transform((v) => (v === "" ? null : v)),
  region: z.enum(regionCodes, {
    errorMap: () => ({ message: "Please choose your growing region." }),
  }),
  experience: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Please choose your gardening experience." }),
  }),
  explanation: z.enum(["simple", "standard", "advanced"], {
    errorMap: () => ({ message: "Please choose how you'd like things explained." }),
  }),
});

export type PreferencesInput = z.input<typeof preferencesSchema>;
export type Preferences = z.output<typeof preferencesSchema>;

/** Turns a zod result into { field: firstMessage } for FormField errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
