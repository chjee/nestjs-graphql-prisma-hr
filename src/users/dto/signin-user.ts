import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType({ description: 'Sign in user input' })
export class SignInInput extends PickType(User, [
  'email',
  'password',
] as const) {
  @Field(() => String, { description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String, { description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;
}

@ObjectType({ description: 'Sign In Output' })
export class SignInOutput {
  @Field(() => String, { nullable: true, description: 'JWT Token' })
  token?: string;
}
