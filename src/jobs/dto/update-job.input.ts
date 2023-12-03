import { CreateJobInput } from './create-job.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update job input' })
export class UpdateJobInput extends OmitType(PartialType(CreateJobInput), [
  'id',
] as const) {}
