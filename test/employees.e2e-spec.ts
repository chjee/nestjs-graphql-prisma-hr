import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { EmployeesService } from '../src/employees/employees.service';

describe('EmployeesResolver (e2e)', () => {
  let app: INestApplication;
  const employeesService = {
    create: () => mockEmployee,
    findAll: () => [mockEmployee],
    findOne: () => mockEmployee,
    update: () => mockEmployee,
    remove: () => mockEmployee,
  };

  const mockEmployee = {
    id: 207,
    firstName: 'andrew',
    lastName: 'Jee',
    email: 'andrew@prisma.io',
    phone: '82.10.9410.5436',
    // hiredAt: new Date().toISOString(),
    jobId: 'IT_PROG',
    salary: 9600,
    commissionPct: 0.2,
    managerId: 103,
    departmentId: 60,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(EmployeesService)
      .useValue(employeesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createEmployee', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createEmployee(
              createEmployeeInput: {
                id: 207,
                firstName: "andrew",
                lastName: "Jee",
                email: "andrew@prisma.io",
                phone: "82.10.9410.5436",
                hiredAt: "2001-09-17T00:00:00.000Z",
                jobId: "IT_PROG",
                salary: 9600,
                commissionPct: 0.2,
                managerId: 103,
                departmentId: 60,
            })
            {
              id
              firstName
              lastName
              email
              phone
            #  hiredAt
              jobId
              salary
              commissionPct
              managerId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createEmployee: employeesService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getEmployees(skip:0, take:2)
            {
              id
              firstName
              lastName
              email
              phone
            #  hiredAt
              jobId
              salary
              commissionPct
              managerId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getEmployees: employeesService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getEmployeeById(id: 100)
            {
              id
              firstName
              lastName
              email
              phone
            #  hiredAt
              jobId
              salary
              commissionPct
              managerId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getEmployeeById: employeesService.findOne() } });
  });

  it('updateEmployee', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateEmployee(id: 1, 
              updateEmployeeInput: {
                firstName: "Steven"
                lastName: "King"
            })
            {
              id
              firstName
              lastName
              email
              phone
            #  hiredAt
              jobId
              salary
              commissionPct
              managerId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateEmployee: employeesService.update() } });
  });

  it('removeEmployee', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeEmployee(id: 207)
            {
              id
              firstName
              lastName
              email
              phone
            #  hiredAt
              jobId
              salary
              commissionPct
              managerId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeEmployee: employeesService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
