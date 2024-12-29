/**
 * Pets schema
 */
import { pets, petRelations } from "./pets";
import { owners, ownerRelations } from "./owners";

export const schema = {
    pets,
    owners
};

export const relations = {
    petRelations,
    ownerRelations
};
