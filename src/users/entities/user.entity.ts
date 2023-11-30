import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@ObjectType({ description: 'User object' })
export class User {
  @Field(() => Int, { description: 'User ID' })
  id: number;

  @Field(() => Date, { description: 'Created date' })
  createdAt: Date;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { nullable: true, description: 'User name' })
  name?: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => String, { description: 'User role' })
  role: string;

  @Field(() => Profile, { nullable: true, description: 'User profile' })
  profile?: Profile | null;
}
