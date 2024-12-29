import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { DrizzleModule } from '@config/drizzle/drizzle.module';


@Module({
  imports: [DrizzleModule],
  providers: [OwnerResolver, OwnerService],
  exports: [OwnerService]
})
export class OwnerModule {}
