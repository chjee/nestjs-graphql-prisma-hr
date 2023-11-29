import { CreateLocationInput } from './create-location.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update location input' })
export class UpdateLocationInput extends PartialType(CreateLocationInput) {}
