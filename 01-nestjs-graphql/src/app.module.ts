import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from '@config/env/env.module';
import { envSchema } from '@config/env/env';
import { DrizzleModule } from '@config/drizzle/drizzle.module';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { OwnerModule } from './owner/owner.module';


@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    EnvModule,
    DrizzleModule,
    PetsModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
