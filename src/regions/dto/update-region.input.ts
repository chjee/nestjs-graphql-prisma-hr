import { CreateRegionInput } from './create-region.input';
import { InputType, PickType } from '@nestjs/graphql';

@InputType({ description: 'Update region input' })
export class UpdateRegionInput extends PickType(CreateRegionInput, [
  'name',
] as const) {}
