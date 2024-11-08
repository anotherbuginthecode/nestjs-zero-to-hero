import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ProductsController],
  imports: [DrizzleModule],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
