import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { CountriesService } from '../countries/countries.service';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly countriesService: CountriesService,
  ) {}

  @Mutation(() => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationsService.create(createLocationInput);
  }

  @Query(() => [Location], { name: 'getLocations' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Location[]> {
    return this.locationsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Location, { name: 'getLocationById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Location> {
    return this.locationsService.findOne({ id: id });
  }

  @ResolveField()
  async country(@Parent() { countryId }: Location) {
    return this.countriesService.findOne({ id: countryId });
  }

  @Mutation(() => Location)
  updateLocation(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationsService.update({
      where: { id: id },
      data: updateLocationInput,
    });
  }

  @Mutation(() => Location)
  removeLocation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Location> {
    return this.locationsService.remove({ id: id });
  }
}
