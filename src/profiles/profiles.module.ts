import { forwardRef, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [ProfilesResolver, ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
