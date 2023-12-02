import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from './../../employees/entities/employee.entity';
import { Location } from './../../locations/entities/location.entity';

@ObjectType({ description: 'Department object' })
export class Department {
  @Field(() => Int, { description: 'Department ID' })
  id: number;

  @Field(() => String, { description: 'Department name' })
  name: string;

  @Field(() => Int, { nullable: true, description: 'Department manager ID' })
  managerId?: number;

  @Field(() => Int, { nullable: true, description: 'Department location ID' })
  locationId?: number;

  @Field(() => Employee, {
    nullable: true,
    description: 'Department manager',
  })
  manager?: Employee | null;

  @Field(() => Location, {
    nullable: true,
    description: 'Department location',
  })
  location?: Location | null;

  @Field(() => [Employee], {
    nullable: true,
    description: 'Department employees',
  })
  employees?: Employee[] | null;
}
