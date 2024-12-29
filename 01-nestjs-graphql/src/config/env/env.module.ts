import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

/**
 * The EnvModule is responsible for providing the EnvService throughout the application.
 * 
 * @module
 * @providers {EnvService} - The service responsible for environment configuration.
 * @exports {EnvService} - The service is exported to be used in other modules.
 */
@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
