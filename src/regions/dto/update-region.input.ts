import { CreateRegionInput } from './create-region.input';
import { InputType, PartialType, PickType } from '@nestjs/graphql';

@InputType({ description: 'Update region input' })
export class UpdateRegionInput extends PickType(
  PartialType(CreateRegionInput),
  ['name'] as const,
) {}
