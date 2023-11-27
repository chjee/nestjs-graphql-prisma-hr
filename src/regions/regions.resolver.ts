import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegionsService } from './regions.service';
import { Region } from './entities/region.entity';
import { CreateRegionInput } from './dto/create-region.input';
import { UpdateRegionInput } from './dto/update-region.input';

@Resolver(() => Region)
export class RegionsResolver {
  constructor(private readonly regionsService: RegionsService) {}

  @Mutation(() => Region)
  async createRegion(
    @Args('createRegionInput') createRegionInput: CreateRegionInput,
  ): Promise<Region> {
    return this.regionsService.create(createRegionInput);
  }

  @Query(() => [Region], { name: 'getRegions' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Region[]> {
    return this.regionsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Region, { name: 'getRegionById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Region> {
    return this.regionsService.findOne({ id: id });
  }

  @Mutation(() => Region)
  async updateRegion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRegionInput') updateRegionInput: UpdateRegionInput,
  ): Promise<Region> {
    return this.regionsService.update({
      where: { id: id },
      data: updateRegionInput,
    });
  }

  @Mutation(() => Region)
  removeRegion(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.regionsService.remove({ id: id });
  }
}
