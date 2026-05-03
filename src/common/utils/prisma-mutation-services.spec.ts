import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CountriesService } from '../../countries/countries.service';
import { DepartmentsService } from '../../departments/departments.service';
import { EmployeesService } from '../../employees/employees.service';
import { JobhistoriesService } from '../../jobhistories/jobhistories.service';
import { JobsService } from '../../jobs/jobs.service';
import { LocationsService } from '../../locations/locations.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { RegionsService } from '../../regions/regions.service';
import { UsersService } from '../../users/users.service';

function prismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError('Prisma error', {
    code,
    clientVersion: 'test',
  });
}

type ServiceConstructor = new (prisma: any) => {
  update(params: { where: any; data: any }): Promise<unknown>;
  remove(where: any): Promise<unknown>;
};

const serviceCases: Array<{
  name: string;
  Service: ServiceConstructor;
  delegate: string;
  where: unknown;
}> = [
  {
    name: 'CountriesService',
    Service: CountriesService,
    delegate: 'country',
    where: { id: 'KR' },
  },
  {
    name: 'DepartmentsService',
    Service: DepartmentsService,
    delegate: 'department',
    where: { id: 1 },
  },
  {
    name: 'EmployeesService',
    Service: EmployeesService,
    delegate: 'employee',
    where: { id: 1 },
  },
  {
    name: 'JobhistoriesService',
    Service: JobhistoriesService,
    delegate: 'jobHistory',
    where: { employeeId_startedAt: { employeeId: 1, startedAt: new Date() } },
  },
  {
    name: 'JobsService',
    Service: JobsService,
    delegate: 'job',
    where: { id: 'IT_PROG' },
  },
  {
    name: 'LocationsService',
    Service: LocationsService,
    delegate: 'location',
    where: { id: 1 },
  },
  {
    name: 'ProfilesService',
    Service: ProfilesService,
    delegate: 'profile',
    where: { id: 1 },
  },
  {
    name: 'RegionsService',
    Service: RegionsService,
    delegate: 'region',
    where: { id: 1 },
  },
  {
    name: 'UsersService',
    Service: UsersService,
    delegate: 'user',
    where: { id: 1 },
  },
];

describe('Prisma-backed mutation services', () => {
  describe.each(serviceCases)('$name', ({ Service, delegate, where }) => {
    let service: InstanceType<ServiceConstructor>;
    let prisma: Record<string, { update: jest.Mock; delete: jest.Mock }>;

    beforeEach(() => {
      prisma = {
        [delegate]: {
          update: jest.fn(),
          delete: jest.fn(),
        },
      };
      service = new Service(prisma);
    });

    it('maps update P2025 to NotFoundException', async () => {
      prisma[delegate].update.mockRejectedValue(prismaError('P2025'));

      await expect(service.update({ where, data: {} })).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('maps remove P2025 to NotFoundException', async () => {
      prisma[delegate].delete.mockRejectedValue(prismaError('P2025'));

      await expect(service.remove(where)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('rethrows non-P2025 update errors', async () => {
      const error = prismaError('P2002');
      prisma[delegate].update.mockRejectedValue(error);

      await expect(service.update({ where, data: {} })).rejects.toThrow(error);
    });

    it('rethrows non-P2025 remove errors', async () => {
      const error = prismaError('P2002');
      prisma[delegate].delete.mockRejectedValue(error);

      await expect(service.remove(where)).rejects.toThrow(error);
    });
  });
});
