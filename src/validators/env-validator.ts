import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1, { message: 'JWT_SECRET é obrigatório' }),
});

export const env = envSchema.parse(process.env);
