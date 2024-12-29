import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { owners } from "./owners";

export const pets = pgTable('pets', {
    id: serial().primaryKey(),
    name: text('name').notNull(),
    breed: text('breed'),
    ownerId: integer('owner_id').unique().notNull().references(() => owners.id)
});

export const petRelations = relations(pets, ({ one }) => ({
    owner: one(owners, {
        fields: [pets.ownerId],
        references: [owners.id]
    })
}));