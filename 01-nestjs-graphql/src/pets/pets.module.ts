import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { DrizzleModule } from '@config/drizzle/drizzle.module';
import { OwnerModule } from '@owner/owner.module';

@Module({
  imports: [DrizzleModule, OwnerModule],
  providers: [PetsService, PetsResolver]
})
export class PetsModule {}
