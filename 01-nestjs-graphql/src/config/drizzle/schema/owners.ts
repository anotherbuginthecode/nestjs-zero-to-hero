import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { pets } from "./pets";


export const owners = pgTable('owners', {
    id: serial().primaryKey(),
    name: text('name').notNull(),
});

export const ownerRelations = relations(owners, ({ many }) => ({
    pets: many(pets)
}));