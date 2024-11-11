import { Injectable, Inject, HttpException} from '@nestjs/common';
import { PG_CONNECTION } from '../drizzle/pg-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateProductDto } from './dto/create-product.dto';
import { products } from '../drizzle/schemas/products/products.entity';
import { Product } from './product.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {

    /**
     * Constructs a new instance of the ProductsService.
     * @param conn The database connection.
     */
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase,
    ) {}

    /**
     * Retrieves all products from the database.
     * @returns A promise that resolves to an array of products.
     */
    async getProducts(): Promise<Product[]> {
        const p = await this.conn
            .select()
            .from(products)
            .execute();
        return p;
    }

    /**
     * Retrieves a product by its ID.
     * @param id The ID of the product to retrieve.
     * @returns A promise that resolves to the product if found.
     * @throws HttpException if the product is not found.
     */
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
    
    /**
     * Adds a new product to the database.
     * @param productDto The data transfer object containing the product details.
     * @returns A promise that resolves to the newly created product.
     */
    async addProduct(productDto: CreateProductDto): Promise<Product> {
        const [p] = await this.conn.insert(products).values(productDto).returning();
        return p;
    }

    /**
     * Updates an existing product in the database.
     * @param id The ID of the product to update.
     * @param productDto The data transfer object containing the updated product details.
     * @returns A promise that resolves to the updated product.
     * @throws HttpException if the product is not found.
     */
    async updateProduct(id: number, productDto: CreateProductDto): Promise<Product> {
        const [p] = await this.conn.update(products).set(productDto).where(eq(products.id, id)).returning();
        if (!p) {
            throw new HttpException({
                message: 'Product not found'
            }, 404);
        }
        return p;
    }

    /**
     * Deletes a product from the database.
     * @param id The ID of the product to delete.
     * @returns A promise that resolves when the product is deleted.
     * @throws HttpException if the product is not found.
     */
    async deleteProduct(id: number): Promise<void> {
        const [p] = await this.conn.delete(products).where(eq(products.id, id)).returning();
        if (!p) {
            throw new HttpException({
                message: 'Product not found'
            }, 404);
        }
    }

}
