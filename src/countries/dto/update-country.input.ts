import { CreateCountryInput } from './create-country.input';
import { InputType, PartialType, PickType } from '@nestjs/graphql';

@InputType({ description: 'Update country input' })
export class UpdateCountryInput extends PickType(
  PartialType(CreateCountryInput),
  ['name', 'regionId'] as const,
) {}
