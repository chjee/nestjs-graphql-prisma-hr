import { CreateEmployeeInput } from './create-employee.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType({ description: 'Update employee input' })
export class UpdateEmployeeInput extends OmitType(CreateEmployeeInput, [
  'id',
  'email',
] as const) {}
