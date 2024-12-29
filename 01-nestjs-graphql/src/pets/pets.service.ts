import { Injectable, Inject, Query } from '@nestjs/common';
import { PetGql } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { PG_CONNECTION } from '@config/drizzle/pg-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { pets } from '@config/drizzle/schema/pets';
import { eq } from 'drizzle-orm';
import { OwnerService } from '@owner/owner.service';
import { owners } from '@config/drizzle/schema/owners';
import { OwnerGql } from '@owner/entities/owner.entity';

@Injectable()
export class PetsService {

    constructor(@Inject(PG_CONNECTION) private conn: NodePgDatabase, private ownerService: OwnerService){}

    async create(petDto: CreatePetDto): Promise<PetGql> {
        const [p] = await this.conn
        .insert(pets)
        .values(petDto)
        .returning()

        return p
    }

    async findAll(): Promise<PetGql[]> {
        const p = await this.conn
        .select()
        .from(pets)
        .execute()

        return p
    }

    async findOneById(id: number): Promise<PetGql> {
        const [p] = await this.conn
        .select()
        .from(pets)
        .where(eq(pets.id, id))
        .execute()

        return p
    }

    async getOwner(ownerId: number): Promise<OwnerGql> {
        return this.ownerService.findOneById(ownerId)
    }
}
