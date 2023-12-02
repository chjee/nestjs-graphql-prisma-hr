import { CreateDepartmentInput } from './create-department.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType({ description: 'Update department input' })
export class UpdateDepartmentInput extends OmitType(CreateDepartmentInput, [
  'id',
] as const) {}
