import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
