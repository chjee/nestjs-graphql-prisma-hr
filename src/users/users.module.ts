import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ProfilesService } from '../profiles/profiles.service';

@Module({
  providers: [UsersResolver, UsersService, ProfilesService],
})
export class UsersModule {}
