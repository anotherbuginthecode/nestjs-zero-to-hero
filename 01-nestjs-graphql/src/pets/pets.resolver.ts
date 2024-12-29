import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { PetGql } from './entities/pet.entity';
import { OwnerGql } from '@owner/entities/owner.entity';
import { CreatePetDto } from './dto/create-pet.dto';

@Resolver(of => PetGql)
export class PetsResolver {
    constructor(private petService: PetsService) {}

    @Query(returns => [PetGql])
    pets(): Promise<PetGql[]> {
        return this.petService.findAll();
    }

    @Query(returns => PetGql, {nullable: true})
    pet(@Args('id', {type: () => Int}) id: number): Promise<PetGql> {
        return this.petService.findOneById(id);
    }

    @Mutation(returns => PetGql)
    createPet(@Args('createPetInput') petDto: CreatePetDto): Promise<PetGql> {
        return this.petService.create(petDto);
    }

    @ResolveField(returns => OwnerGql)
    owner(@Parent() pet: PetGql) {
        return this.petService.getOwner(pet.ownerId);
    }
}
