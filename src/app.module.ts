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
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { JobhistoriesModule } from './jobhistories/jobhistories.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.dev', '.env'],
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
    DepartmentsModule,
    EmployeesModule,
    JobhistoriesModule,
    CommonModule,
    AuthModule,
  ],
  providers: [
    { provide: 'APP_GUARD', useExisting: JwtAuthGuard },
    JwtAuthGuard,
  ],
})
export class AppModule {}
