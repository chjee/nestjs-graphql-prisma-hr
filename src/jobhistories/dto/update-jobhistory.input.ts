import { CreateJobhistoryInput } from './create-jobhistory.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update jobhistory input' })
export class UpdateJobhistoryInput extends OmitType(
  PartialType(CreateJobhistoryInput),
  ['employeeId', 'startedAt'] as const,
) {}
