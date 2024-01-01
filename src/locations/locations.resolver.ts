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
import { Country } from '../countries/entities/country.entity';
import { DepartmentsService } from '../departments/departments.service';
import { Department } from '../departments/entities/department.entity';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly countriesService: CountriesService,
    private readonly departmentsService: DepartmentsService,
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

  @Query(() => Location, { nullable: true, name: 'getLocationById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Location> {
    return this.locationsService.findOne({ id: id });
  }

  @ResolveField()
  async country(@Parent() { countryId }: Location): Promise<Country> {
    return this.countriesService.findOne({ id: countryId });
  }

  @ResolveField()
  async departments(@Parent() { id }: Location): Promise<Department[]> {
    return this.departmentsService.findAll({ where: { locationId: id } });
  }

  @Mutation(() => Location, { nullable: true, name: 'updateLocation' })
  updateLocation(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationsService.update({
      where: { id: id },
      data: updateLocationInput,
    });
  }

  @Mutation(() => Location, { nullable: true, name: 'removeLocation' })
  removeLocation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Location> {
    return this.locationsService.remove({ id: id });
  }
}
