import { integer, serial, pgTable, text, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const products = pgTable('products', {
    id: serial().primaryKey(),
    name: text('name').unique().notNull(),
    description: text('description'),
    price: doublePrecision('price').notNull(),
    quantity: integer('quantity').notNull().default(0),
    in_stock: boolean('in_stock').notNull().default(true),
});

export const ProductEntitySchema = createSelectSchema(products);
export const ProductEntityInsertSchema = createInsertSchema(products);

export type ProductEntity = InferSelectModel<typeof products>;
export type ProductEntityInsert = InferInsertModel<typeof products>;