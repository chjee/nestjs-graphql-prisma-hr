import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { DepartmentsService } from '../src/departments/departments.service';

describe('DepartmentsResolver (e2e)', () => {
  let app: INestApplication;
  const departmentsService = {
    create: () => mockDepartment,
    findAll: () => [mockDepartment],
    findOne: () => mockDepartment,
    update: () => mockDepartment,
    remove: () => mockDepartment,
  };

  const mockDepartment = {
    id: 60,
    name: 'IT',
    managerId: 103,
    locationId: 1400,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(DepartmentsService)
      .useValue(departmentsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createDepartment', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createDepartment(createDepartmentInput: {
              id: 280
              name: "Cleansing Service"
              managerId: 100
              locationId: 1700
            })
            {
              id
              name
              managerId
              locationId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createDepartment: departmentsService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getDepartments(skip:0, take:2)
            {
              id
              name
              managerId
              locationId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getDepartments: departmentsService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getDepartmentById(id: 60)
            {
              id
              name
              managerId
              locationId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getDepartmentById: departmentsService.findOne() } });
  });

  it('updateDepartment', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateDepartment(id: 280, 
              updateDepartmentInput: {
                  name: "Cleansing Service"
                  # managerId: 100
                  # locationId: 1700
            })
            {
              id
              name
              managerId
              locationId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateDepartment: departmentsService.update() } });
  });

  it('removeDepartment', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeDepartment(id: 280)
            {
              id
              name
              managerId
              locationId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeDepartment: departmentsService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
