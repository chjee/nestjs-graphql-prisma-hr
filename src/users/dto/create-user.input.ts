import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { $Enums } from '@prisma/client';

@InputType({ description: 'Create user input' })
export class CreateUserInput {
  @Field(() => String, { description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 60)
  email: string;

  @Field(() => String, { nullable: true, description: 'User name' })
  @IsString()
  @Length(4, 60)
  name?: string;

  @Field(() => String, { description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;

  @Field(() => String, { description: 'User role' })
  @IsNotEmpty()
  @IsEnum(['ADMIN', 'USER'])
  role: $Enums.Role;
}
