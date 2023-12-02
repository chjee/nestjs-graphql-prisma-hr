import { CreateJobhistoryInput } from './create-jobhistory.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType({ description: 'Update jobhistory input' })
export class UpdateJobhistoryInput extends OmitType(CreateJobhistoryInput, [
  'employeeId',
] as const) {}
