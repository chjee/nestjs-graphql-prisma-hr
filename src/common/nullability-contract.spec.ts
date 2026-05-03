import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import {
  GraphQLSchema,
  getNamedType,
  isInputObjectType,
  isNonNullType,
  isObjectType,
} from 'graphql';
import { CountriesResolver } from '../countries/countries.resolver';
import { CreateCountryInput } from '../countries/dto/create-country.input';
import { DepartmentsResolver } from '../departments/departments.resolver';
import { CreateDepartmentInput } from '../departments/dto/create-department.input';
import { EmployeesResolver } from '../employees/employees.resolver';
import { CreateEmployeeInput } from '../employees/dto/create-employee.input';
import { JobhistoriesResolver } from '../jobhistories/jobhistories.resolver';
import { JobsResolver } from '../jobs/jobs.resolver';
import { CreateJobInput } from '../jobs/dto/create-job.input';
import { LocationsResolver } from '../locations/locations.resolver';
import { CreateLocationInput } from '../locations/dto/create-location.input';
import { ProfilesResolver } from '../profiles/profiles.resolver';
import { RegionsResolver } from '../regions/regions.resolver';
import { CreateRegionInput } from '../regions/dto/create-region.input';
import { UsersResolver } from '../users/users.resolver';
import { DateScalar } from './scalars/date.scalar';

function input<T extends object>(ctor: new () => T, values: Partial<T>): T {
  return Object.assign(new ctor(), values);
}

describe('GraphQL input nullability contracts', () => {
  let moduleRef: TestingModule;
  let schema: GraphQLSchema;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
      providers: [DateScalar],
    }).compile();

    const schemaFactory = moduleRef.get(GraphQLSchemaFactory);
    schema = await schemaFactory.create(
      [
        CountriesResolver,
        DepartmentsResolver,
        EmployeesResolver,
        JobhistoriesResolver,
        JobsResolver,
        LocationsResolver,
        ProfilesResolver,
        RegionsResolver,
        UsersResolver,
      ],
      [DateScalar],
      { skipCheck: true },
    );
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  function expectNullableInputField(typeName: string, fieldName: string): void {
    const type = getNamedType(schema.getType(typeName));

    expect(isInputObjectType(type)).toBe(true);
    if (!isInputObjectType(type)) {
      return;
    }

    expect(isNonNullType(type.getFields()[fieldName].type)).toBe(false);
  }

  function expectNullableObjectField(
    typeName: string,
    fieldName: string,
  ): void {
    const type = getNamedType(schema.getType(typeName));

    expect(isObjectType(type)).toBe(true);
    if (!isObjectType(type)) {
      return;
    }

    expect(isNonNullType(type.getFields()[fieldName].type)).toBe(false);
  }

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

  it('keeps nullable Prisma-backed input fields nullable in the GraphQL schema', () => {
    expectNullableInputField('CreateCountryInput', 'name');
    expectNullableInputField('CreateDepartmentInput', 'managerId');
    expectNullableInputField('CreateDepartmentInput', 'locationId');
    expectNullableInputField('CreateEmployeeInput', 'firstName');
    expectNullableInputField('CreateEmployeeInput', 'phone');
    expectNullableInputField('CreateEmployeeInput', 'commissionPct');
    expectNullableInputField('CreateEmployeeInput', 'managerId');
    expectNullableInputField('CreateEmployeeInput', 'departmentId');
    expectNullableInputField('CreateJobInput', 'minSalary');
    expectNullableInputField('CreateJobInput', 'maxSalary');
    expectNullableInputField('CreateLocationInput', 'streetAddress');
    expectNullableInputField('CreateLocationInput', 'postalCode');
    expectNullableInputField('CreateLocationInput', 'stateProvince');
    expectNullableInputField('CreateRegionInput', 'name');
  });

  it('keeps nullable Prisma-backed object fields nullable in the GraphQL schema', () => {
    expectNullableObjectField('User', 'profile');
    expectNullableObjectField('Department', 'managerId');
    expectNullableObjectField('Department', 'locationId');
    expectNullableObjectField('Department', 'manager');
    expectNullableObjectField('Department', 'location');
    expectNullableObjectField('Employee', 'firstName');
    expectNullableObjectField('Employee', 'phone');
    expectNullableObjectField('Employee', 'commissionPct');
    expectNullableObjectField('Employee', 'managerId');
    expectNullableObjectField('Employee', 'departmentId');
    expectNullableObjectField('Employee', 'manager');
    expectNullableObjectField('Employee', 'department');
    expectNullableObjectField('Country', 'name');
    expectNullableObjectField('Job', 'minSalary');
    expectNullableObjectField('Job', 'maxSalary');
    expectNullableObjectField('Location', 'streetAddress');
    expectNullableObjectField('Location', 'postalCode');
    expectNullableObjectField('Location', 'stateProvince');
    expectNullableObjectField('Region', 'name');
  });
});
