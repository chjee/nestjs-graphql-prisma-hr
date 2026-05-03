import { validate } from 'class-validator';
import { CreateCountryInput } from '../countries/dto/create-country.input';
import { CreateDepartmentInput } from '../departments/dto/create-department.input';
import { CreateEmployeeInput } from '../employees/dto/create-employee.input';
import { CreateJobInput } from '../jobs/dto/create-job.input';
import { CreateLocationInput } from '../locations/dto/create-location.input';
import { CreateRegionInput } from '../regions/dto/create-region.input';

function input<T extends object>(ctor: new () => T, values: Partial<T>): T {
  return Object.assign(new ctor(), values);
}

describe('GraphQL input nullability contracts', () => {
  it('allows fields that are nullable in the Prisma schema to be omitted', async () => {
    await expect(
      validate(input(CreateCountryInput, { id: 'KR', regionId: 3 })),
    ).resolves.toHaveLength(0);
    await expect(
      validate(input(CreateRegionInput, { id: 5 })),
    ).resolves.toHaveLength(0);
    await expect(
      validate(input(CreateDepartmentInput, { id: 60, name: 'IT' })),
    ).resolves.toHaveLength(0);
    await expect(
      validate(
        input(CreateEmployeeInput, {
          id: 207,
          lastName: 'Jee',
          email: 'andrew@prisma.io',
          hiredAt: new Date(),
          jobId: 'IT_PROG',
          salary: 9600,
        }),
      ),
    ).resolves.toHaveLength(0);
    await expect(
      validate(
        input(CreateJobInput, {
          id: 'AC_MGR',
          title: 'Accounting Manager',
        }),
      ),
    ).resolves.toHaveLength(0);
    await expect(
      validate(input(CreateLocationInput, { city: 'Seoul', countryId: 'KR' })),
    ).resolves.toHaveLength(0);
  });

  it('keeps required Prisma fields as validation failures when omitted', async () => {
    await expect(
      validate(input(CreateCountryInput, { id: 'KR' })),
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'regionId' }),
      ]),
    );
    await expect(
      validate(input(CreateEmployeeInput, { id: 207 })),
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'lastName' }),
        expect.objectContaining({ property: 'email' }),
        expect.objectContaining({ property: 'hiredAt' }),
        expect.objectContaining({ property: 'jobId' }),
        expect.objectContaining({ property: 'salary' }),
      ]),
    );
  });
});
