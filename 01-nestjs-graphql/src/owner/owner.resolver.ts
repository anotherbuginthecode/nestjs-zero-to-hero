import { Resolver } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { OwnerGql } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Resolver(of => OwnerGql)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  // Queries
  @Query(() => [OwnerGql])
  async owners() {
    return this.ownerService.findAll();
  }

  @Query(() => OwnerGql)
  async owner(id: number) {
    return this.ownerService.findOneById(id);
  }

  // Mutations
  @Mutation(() => OwnerGql)
  async createOwner(@Args('input') input: CreateOwnerDto) {
    return this.ownerService.create(input);
  }
}
