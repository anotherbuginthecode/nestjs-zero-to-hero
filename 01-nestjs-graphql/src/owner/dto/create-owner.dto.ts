import { createZodDto } from "nestjs-zod";
import { owners } from "@config/drizzle/schema/owners";
import { createInsertSchema } from "drizzle-zod";
import { InputType, Field } from "@nestjs/graphql";

const ownerInsertSchema = createInsertSchema(owners);

@InputType()
export class CreateOwnerDto extends createZodDto(ownerInsertSchema) {
    @Field()
    name!: string;
}