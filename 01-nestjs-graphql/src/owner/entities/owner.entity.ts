import { Field, ObjectType } from "@nestjs/graphql";
import { PetGql } from "@pets/entities/pet.entity";

@ObjectType()
export class OwnerGql {
    @Field()
    id!: number;

    @Field()
    name!: string;

    @Field(type => [PetGql], { nullable: 'items' })
    pets?:  PetGql[];
}