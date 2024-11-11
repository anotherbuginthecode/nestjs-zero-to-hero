import { Injectable, Inject, HttpException} from '@nestjs/common';
import { PG_CONNECTION } from '../drizzle/pg-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateProductDto } from './dto/create-product.dto';
import { products } from '../drizzle/schemas/products/products.entity';
import { Product } from './product.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase,
    ) {}

    async getProducts(): Promise<Product[]> {
        const p = await this.conn
            .select()
            .from(products)
            .execute();
        return p;
    }

    async getProductById(id: number): Promise<Product> {
        const [p] = await this.conn
            .select()
            .from(products)
            .where(eq(products.id, id))
            .execute();
        if (!p) {
            throw new HttpException({
                message: 'Product not found'
            }, 404);
        }
        return p;
    }

    async addProduct(productDto: CreateProductDto): Promise<Product> {
        const [p] = await this.conn.insert(products).values(productDto).returning();
        return p;
    }

    async updateProduct(id: number, productDto: CreateProductDto): Promise<Product> {
        const [p] = await this.conn.update(products).set(productDto).where(eq(products.id, id)).returning();
        if (!p) {
            throw new HttpException({
                message: 'Product not found'
            }, 404);
        }
        return p;
    }

    async deleteProduct(id: number): Promise<void> {
        const [p] = await this.conn.delete(products).where(eq(products.id, id)).returning();
        if (!p) {
            throw new HttpException({
                message: 'Product not found'
            }, 404);
        }
    }

}
