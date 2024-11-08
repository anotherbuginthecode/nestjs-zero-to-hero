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
