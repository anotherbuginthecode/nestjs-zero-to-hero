import { createZodDto } from "nestjs-zod";
import { pets } from "@config/drizzle/schema/pets";
import { createInsertSchema } from "drizzle-zod";
import { InputType, Field, Int } from "@nestjs/graphql";

const petInsertSchema = createInsertSchema(pets);

@InputType()
export class CreatePetDto extends createZodDto(petInsertSchema) {
    @Field()
    name!: string;

    @Field({ nullable: true })
    breed?: string;

    @Field(type => Int)
    ownerId!: number;
}
