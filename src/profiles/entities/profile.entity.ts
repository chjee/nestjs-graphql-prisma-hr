import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './../../users/entities/user.entity';

@ObjectType({ description: 'Profile object' })
export class Profile {
  @Field(() => Int, { description: 'Profile ID' })
  id: number;

  @Field(() => String, { description: 'User bio' })
  bio: string;

  @Field(() => Int, { description: 'User ID' })
  userId: number;

  @Field(() => User, { nullable: true, description: 'User' })
  user?: User | null;
}
