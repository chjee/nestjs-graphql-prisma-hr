import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { RegionsService } from '../regions/regions.service';
import { Region } from '../regions/entities/region.entity';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly regionsService: RegionsService,
  ) {}

  @Mutation(() => Country)
  async createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    return this.countriesService.create(createCountryInput);
  }

  @Query(() => [Country], { name: 'getCountries' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Country[]> {
    return this.countriesService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Country, { name: 'getCountryById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.countriesService.findOne({ id: id });
  }

  @ResolveField()
  async region(@Parent() { regionId }: Country): Promise<Region> {
    return this.regionsService.findOne({ id: regionId });
  }

  @Mutation(() => Country)
  updateCountry(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCountryInput') updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    return this.countriesService.update({
      where: { id: id },
      data: updateCountryInput,
    });
  }

  @Mutation(() => Country)
  removeCountry(@Args('id', { type: () => String }) id: string) {
    return this.countriesService.remove({ id: id });
  }
}
