import { CreateJobInput } from './create-job.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType({ description: 'Update job input' })
export class UpdateJobInput extends OmitType(CreateJobInput, ['id'] as const) {}
