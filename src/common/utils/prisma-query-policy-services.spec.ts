import { CountriesService } from '../../countries/countries.service';
import { DepartmentsService } from '../../departments/departments.service';
import { EmployeesService } from '../../employees/employees.service';
import { JobhistoriesService } from '../../jobhistories/jobhistories.service';
import { JobsService } from '../../jobs/jobs.service';
import { LocationsService } from '../../locations/locations.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { RegionsService } from '../../regions/regions.service';
import { UsersService } from '../../users/users.service';
import { DEFAULT_QUERY_TAKE, MAX_QUERY_TAKE } from './query-policy.util';

type ServiceConstructor = new (prisma: any) => {
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<unknown[]>;
};

const serviceCases: Array<{
  name: string;
  Service: ServiceConstructor;
  delegate: string;
  expectedDefaultOrderBy: unknown;
  customOrderBy: unknown;
}> = [
  {
    name: 'CountriesService',
    Service: CountriesService,
    delegate: 'country',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'DepartmentsService',
    Service: DepartmentsService,
    delegate: 'department',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'EmployeesService',
    Service: EmployeesService,
    delegate: 'employee',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'JobhistoriesService',
    Service: JobhistoriesService,
    delegate: 'jobHistory',
    expectedDefaultOrderBy: [{ employeeId: 'asc' }, { startedAt: 'asc' }],
    customOrderBy: { startedAt: 'desc' },
  },
  {
    name: 'JobsService',
    Service: JobsService,
    delegate: 'job',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'LocationsService',
    Service: LocationsService,
    delegate: 'location',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'ProfilesService',
    Service: ProfilesService,
    delegate: 'profile',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'RegionsService',
    Service: RegionsService,
    delegate: 'region',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
  {
    name: 'UsersService',
    Service: UsersService,
    delegate: 'user',
    expectedDefaultOrderBy: { id: 'asc' },
    customOrderBy: { id: 'desc' },
  },
];

describe('Prisma-backed list query policy', () => {
  describe.each(serviceCases)(
    '$name',
    ({ Service, delegate, expectedDefaultOrderBy, customOrderBy }) => {
      let service: InstanceType<ServiceConstructor>;
      let prisma: Record<string, { findMany: jest.Mock }>;

      beforeEach(() => {
        prisma = {
          [delegate]: {
            findMany: jest.fn().mockResolvedValue([]),
          },
        };
        service = new Service(prisma);
      });

      it('applies default take and stable ordering', async () => {
        await service.findAll({});

        expect(prisma[delegate].findMany).toHaveBeenCalledWith({
          skip: undefined,
          take: DEFAULT_QUERY_TAKE,
          cursor: undefined,
          where: undefined,
          orderBy: expectedDefaultOrderBy,
        });
      });

      it('caps take and preserves explicit ordering', async () => {
        const cursor = { id: 'cursor' };
        const where = { name: { contains: 'A' } };

        await service.findAll({
          skip: -3,
          take: MAX_QUERY_TAKE + 500,
          cursor,
          where,
          orderBy: customOrderBy,
        });

        expect(prisma[delegate].findMany).toHaveBeenCalledWith({
          skip: 0,
          take: MAX_QUERY_TAKE,
          cursor,
          where,
          orderBy: customOrderBy,
        });
      });
    },
  );
});
