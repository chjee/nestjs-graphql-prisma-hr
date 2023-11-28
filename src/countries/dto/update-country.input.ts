import { CreateCountryInput } from './create-country.input';
import { InputType, PickType } from '@nestjs/graphql';

@InputType({ description: 'Update country input' })
export class UpdateCountryInput extends PickType(CreateCountryInput, [
  'name',
  'regionId',
] as const) {}
