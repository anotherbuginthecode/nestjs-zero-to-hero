import { createZodDto } from "nestjs-zod";
import { products } from '../../drizzle/schemas/products/products.entity';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const CreateProductSchema = createInsertSchema(products, {
        name: z.string().min(3, {message: "TOO SMALL 🤬"}).max(255),
        price: z.number().min(0),
        quantity: z.number().min(0).default(0),
        description: z.string().optional(),
        in_stock: z.boolean().default(true),
    });

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
