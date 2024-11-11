import { createZodDto } from "nestjs-zod";
import { products } from '../../drizzle/schemas/products/products.entity';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * Schema for creating a new product.
 * 
 * This schema defines the structure and validation rules for creating a new product.
 * 
 * Fields:
 * - `name`: A string representing the name of the product. It must be at least 3 characters long and no more than 255 characters. If the name is too short, an error message "TOO SMALL 🤬" will be shown.
 * - `price`: A number representing the price of the product. It must be a non-negative value.
 * - `quantity`: A number representing the quantity of the product. It must be a non-negative value and defaults to 0 if not provided.
 * - `description`: An optional string providing a description of the product.
 * - `in_stock`: A boolean indicating whether the product is in stock. It defaults to true if not provided.
 * 
 * We use Zod for schema validation because it provides a simple and expressive way to define and validate the structure of data. 
 * Zod allows us to specify detailed validation rules and custom error messages, ensuring that the data conforms to the expected format before it is processed further. 
 * This helps in maintaining data integrity and preventing potential runtime errors.
 */
export const CreateProductSchema = createInsertSchema(products, {
        name: z.string().min(3, {message: "TOO SMALL 🤬"}).max(255),
        price: z.number().min(0),
        quantity: z.number().min(0).default(0),
        description: z.string().optional(),
        in_stock: z.boolean().default(true),
    });

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
