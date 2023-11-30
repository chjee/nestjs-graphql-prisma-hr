import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RegionsModule } from './regions/regions.module';
import { CountriesModule } from './countries/countries.module';
import { LocationsModule } from './locations/locations.module';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env.dev, .env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    PrismaModule,
    RegionsModule,
    CountriesModule,
    LocationsModule,
    JobsModule,
    UsersModule,
    ProfilesModule,
  ],
  providers: [],
})
export class AppModule {}
