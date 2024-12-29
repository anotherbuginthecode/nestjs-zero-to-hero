import { ObjectType, Field, Int } from "@nestjs/graphql";
import { OwnerGql } from "@owner/entities/owner.entity";

@ObjectType()
export class PetGql {
    @Field(type => Int)
    id!: number;

    @Field()
    name!: string;

    @Field(type => String, { nullable: true })
    breed?: string | null;

    @Field(type => Int)
    ownerId!: number;

    @Field(type => OwnerGql)
    owner?: OwnerGql;
}