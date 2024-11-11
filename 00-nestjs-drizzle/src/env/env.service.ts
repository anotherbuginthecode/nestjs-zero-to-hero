import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

/**
 * Service to manage environment variables.
 * 
 * This service provides a method to retrieve environment variables
 * using the `ConfigService`.
 * 
 * @example
 * ```typescript
 * const dbHost = this.envService.get('DATABASE_HOST');
 * ```
 */
@Injectable()
export class EnvService {
    constructor(private configService: ConfigService<Env,true>) {}
    get<T extends keyof Env>(key: T): Env[T] {
        return this.configService.get(key, { infer: true });
    }
}
