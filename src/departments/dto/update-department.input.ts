import { CreateDepartmentInput } from './create-department.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update department input' })
export class UpdateDepartmentInput extends OmitType(
  PartialType(CreateDepartmentInput),
  ['id'] as const,
) {}
