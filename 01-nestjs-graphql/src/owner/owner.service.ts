import { Injectable, Inject } from '@nestjs/common';
import { OwnerGql } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { PG_CONNECTION } from '@config/drizzle/pg-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { owners } from '@config/drizzle/schema/owners';
import { eq } from 'drizzle-orm';


@Injectable()
export class OwnerService {

    constructor(@Inject(PG_CONNECTION) private conn: NodePgDatabase,){}

    async create(ownerDto: CreateOwnerDto): Promise<OwnerGql> {
        const [o] = await this.conn
        .insert(owners)
        .values(ownerDto)
        .returning()

        return o
    }

    async findAll(): Promise<OwnerGql[]> {
        const o = await this.conn
        .select()
        .from(owners)
        .execute()

        return o
    }

    async findOneById(id: number): Promise<OwnerGql> {
        const [o] = await this.conn
        .select()
        .from(owners)
        .where(eq(owners.id, id))
        .execute()

        return o
    }

}
