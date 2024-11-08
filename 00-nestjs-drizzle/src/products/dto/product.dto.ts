import { createSelectSchema } from "drizzle-zod";
import { products } from "src/drizzle/schemas/products/products.entity";
import { createZodDto } from "nestjs-zod";


export const ProductSchema = createSelectSchema(products);
export const ProductDto = createZodDto(ProductSchema);