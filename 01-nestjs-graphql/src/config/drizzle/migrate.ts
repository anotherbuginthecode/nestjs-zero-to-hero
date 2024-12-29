import * as dotenv from 'dotenv';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';
import { schema } from './schema';

dotenv.config();

(async () => {
    /**
     * Creates a new PostgreSQL connection pool using the provided connection string from the environment variable `DATABASE_URL`.
     * 
     * @constant
     * @type {pg.Pool}
     * @default
     * @see {@link https://node-postgres.com/features/pooling|pg.Pool}
     */
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    let db: NodePgDatabase<typeof schema> | null = null;
    db = drizzle(pool, {
        schema: {
            ...schema,
        },
    });

  // Look for migrations in the src/drizzle/migrations folder
    const migrationPath = path.join(process.cwd(), '@/config/drizzle/migrations');

  // Run the migrations
    await migrate(db, { migrationsFolder: migrationPath });
    console.log('Migration complete');
    exit(0);
})();