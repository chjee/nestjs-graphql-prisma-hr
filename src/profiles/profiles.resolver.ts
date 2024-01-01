import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    return this.profilesService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'getProfiles' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Profile[]> {
    return this.profilesService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Profile, { nullable: true, name: 'getProfileById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profilesService.findOne({ id });
  }

  @ResolveField()
  async user(@Parent() { userId }: Profile): Promise<User> {
    return this.usersService.findOne({ id: userId });
  }

  @Mutation(() => Profile, { nullable: true, name: 'updateProfile' })
  async updateProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    return this.profilesService.update({
      where: { id: id },
      data: updateProfileInput,
    });
  }

  @Mutation(() => Profile, { nullable: true, name: 'removeProfile' })
  async removeProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.profilesService.remove({ id: id });
  }
}
