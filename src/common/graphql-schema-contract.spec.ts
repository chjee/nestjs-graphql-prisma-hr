import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import {
  GraphQLSchema,
  getNamedType,
  isObjectType,
  lexicographicSortSchema,
  printSchema,
} from 'graphql';
import { AuthResolver } from '../auth/auth.resolver';
import { CountriesResolver } from '../countries/countries.resolver';
import { DepartmentsResolver } from '../departments/departments.resolver';
import { EmployeesResolver } from '../employees/employees.resolver';
import { JobhistoriesResolver } from '../jobhistories/jobhistories.resolver';
import { JobsResolver } from '../jobs/jobs.resolver';
import { LocationsResolver } from '../locations/locations.resolver';
import { ProfilesResolver } from '../profiles/profiles.resolver';
import { RegionsResolver } from '../regions/regions.resolver';
import { UsersResolver } from '../users/users.resolver';
import { DateScalar } from './scalars/date.scalar';

const schemaResolvers = [
  AuthResolver,
  CountriesResolver,
  DepartmentsResolver,
  EmployeesResolver,
  JobhistoriesResolver,
  JobsResolver,
  LocationsResolver,
  ProfilesResolver,
  RegionsResolver,
  UsersResolver,
];

function getObjectType(schema: GraphQLSchema, typeName: string) {
  const type = getNamedType(schema.getType(typeName));

  expect(isObjectType(type)).toBe(true);
  if (!isObjectType(type)) {
    throw new Error(`${typeName} is not an object type`);
  }

  return type;
}

describe('GraphQL schema contract', () => {
  let moduleRef: TestingModule;
  let schema: GraphQLSchema;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
      providers: [DateScalar],
    }).compile();

    const schemaFactory = moduleRef.get(GraphQLSchemaFactory);
    schema = await schemaFactory.create(schemaResolvers, [DateScalar], {
      skipCheck: true,
    });
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('matches the committed sorted schema snapshot', () => {
    expect(printSchema(lexicographicSortSchema(schema))).toMatchSnapshot();
  });

  it('keeps user password out of public object fields', () => {
    const userFields = getObjectType(schema, 'User').getFields();

    expect(userFields.password).toBeUndefined();
    expect(userFields.email).toBeDefined();
  });

  it('keeps list query pagination args visible in the schema', () => {
    const mutationFields = getObjectType(schema, 'Mutation').getFields();
    const queryFields = getObjectType(schema, 'Query').getFields();

    expect(mutationFields.loginUser.args.map((arg) => arg.name)).toEqual([
      'signInInput',
    ]);

    for (const fieldName of [
      'getCountries',
      'getDepartments',
      'getEmployees',
      'getJobhistories',
      'getJobs',
      'getLocations',
      'getProfiles',
      'getRegions',
      'getUsers',
    ]) {
      expect(queryFields[fieldName].args.map((arg) => arg.name)).toEqual(
        expect.arrayContaining(['skip', 'take']),
      );
    }
  });

  it('keeps relation list pagination args visible in the schema', () => {
    const relationFields = [
      ['Country', 'locations'],
      ['Department', 'employees'],
      ['Department', 'jobhistories'],
      ['Employee', 'otherEmployees'],
      ['Employee', 'jobHistories'],
      ['Job', 'employees'],
      ['Job', 'jobHistories'],
      ['Location', 'departments'],
      ['Region', 'countries'],
    ] as const;

    for (const [typeName, fieldName] of relationFields) {
      const field = getObjectType(schema, typeName).getFields()[fieldName];

      expect(field.args.map((arg) => arg.name)).toEqual(
        expect.arrayContaining(['skip', 'take']),
      );
    }
  });
});
