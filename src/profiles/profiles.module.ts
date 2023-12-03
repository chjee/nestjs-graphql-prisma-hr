import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { UsersService } from '../users/users.service';

@Module({
  providers: [ProfilesResolver, ProfilesService, UsersService],
})
export class ProfilesModule {}
