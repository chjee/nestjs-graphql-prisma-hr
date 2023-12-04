import { CreateEmployeeInput } from './create-employee.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update employee input' })
export class UpdateEmployeeInput extends OmitType(
  PartialType(CreateEmployeeInput),
  ['id', 'email'] as const,
) {}
