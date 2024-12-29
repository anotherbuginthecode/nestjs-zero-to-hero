import {z} from 'zod';
export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.string().readonly(),
});

export type Env = z.infer<typeof envSchema>;