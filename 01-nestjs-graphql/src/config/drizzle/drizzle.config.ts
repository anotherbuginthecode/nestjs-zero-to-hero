import type { Config } from 'drizzle-kit';


export default {
  schema: 'src/config/drizzle/schema/*', // Path to schema file
  out: 'src/config/drizzle/migrations', // Path to output directory
  dialect: 'postgresql', // Database dialect
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    casing: 'snake_case', // Casing for column names
} satisfies Config;