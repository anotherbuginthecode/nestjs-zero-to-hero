/**
 * DrizzleModule is a NestJS module that provides a PostgreSQL connection using the drizzle ORM.
 * 
 * @module
 * @providers
 * - EnvService: A service to manage environment variables.
 * - PG_CONNECTION: A provider that creates a PostgreSQL connection pool using the connection string from EnvService.
 * 
 * The PG_CONNECTION provider uses a factory function to create a connection pool with the drizzle ORM.
 * 
 * @exports
 * - PG_CONNECTION: The PostgreSQL connection pool is exported for use in other modules.
 */

import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from './pg-connection';
import { EnvService } from 'src/env/env.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas/schema';

@Module({
    providers: [
        EnvService,
        {
            provide: PG_CONNECTION,
            inject: [EnvService],
            useFactory: async (env: EnvService) => {
                const connectionString = env.get('DATABASE_URL');
                const pool = new Pool({ connectionString });
                return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
            }
        }
    ],
    exports: [PG_CONNECTION]
})
export class DrizzleModule {}
