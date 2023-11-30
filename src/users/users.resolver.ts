import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUsers' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<User[]> {
    return this.usersService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => User, { name: 'getUserById' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne({ id });
  }

  @ResolveField()
  async profile(@Parent() { id }: User) {
    return this.profilesService.findOne({ id: id });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({
      where: { id: id },
      data: updateUserInput,
    });
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.usersService.remove({ id: id });
  }
}
