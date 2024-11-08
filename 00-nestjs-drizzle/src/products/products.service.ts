import { Injectable, Inject} from '@nestjs/common';
import { PG_CONNECTION } from '../drizzle/pg-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateProductSchema } from './dto/create-product.dto';
import { products } from '../drizzle/schemas/products/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase,
    ) {}

    async addProduct(newProduct: CreateProductSchema): Promise<any>{
        return await this.conn.insert(products).values(newProduct).execute();
    }
}
