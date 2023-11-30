import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ProfilesResolver, ProfilesService, UsersService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
