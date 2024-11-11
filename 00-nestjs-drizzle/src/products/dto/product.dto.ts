import { createSelectSchema } from "drizzle-zod";
import { products } from "src/drizzle/schemas/products/products.entity";
import { createZodDto } from "nestjs-zod";


/**
 * Schema for selecting product data.
 * 
 * This schema is created using the `createSelectSchema` function and is based on the `products` data structure.
 * It is used to define the shape of the data that will be selected from the products table.
 */
export const ProductSchema = createSelectSchema(products);
export const ProductDto = createZodDto(ProductSchema);