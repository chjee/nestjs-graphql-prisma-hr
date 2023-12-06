import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { JobhistoriesService } from '../src/jobhistories/jobhistories.service';

describe('JobhistoriesResolver (e2e)', () => {
  let app: INestApplication;
  const jobhistoriesService = {
    create: () => mockJobHistory,
    findAll: () => [mockJobHistory],
    findOne: () => mockJobHistory,
    update: () => mockJobHistory,
    remove: () => mockJobHistory,
  };

  const mockJobHistory = {
    employeeId: 103,
    // startedAt: new Date(),
    // endedAt: new Date(),
    jobId: 'IT_PROG',
    departmentId: 60,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(JobhistoriesService)
      .useValue(jobhistoriesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createJobhistory', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createJobhistory  (
              createJobhistoryInput: {
                employeeId: 102
                startedAt: "2022-12-01T00:00:00.000Z"
                endedAt: "2023-12-01T00:00:00.000Z"
                jobId: "IT_PROG"
                departmentId: 60
             })
             {
              employeeId
            #  startedAt
            #  endedAt
              jobId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createJobhistory: jobhistoriesService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getJobhistories(skip:0, take:5, employeeId: 102)
            {
              employeeId
            #  startedAt
            #  endedAt
              jobId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getJobhistories: jobhistoriesService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getJobhistoryByEmployeeId(
              employeeId: 101
              startedAt: "2001-09-21T00:00:00.000Z"
            )      
            {
              employeeId
            #  startedAt
            #  endedAt
              jobId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({
        data: { getJobhistoryByEmployeeId: jobhistoriesService.findOne() },
      });
  });

  it('updateJobhistory', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateJobhistory (
              employeeId: 102
              startedAt: "2022-12-01T00:00:00.000Z"
              updateJobhistoryInput: {
                  departmentId: 110
              }
            ){
              employeeId
            #  startedAt
            #  endedAt
              jobId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateJobhistory: jobhistoriesService.update() } });
  });

  it('removeJobhistory', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeJobhistory (
              employeeId: 102
              startedAt: "2022-12-01T00:00:00.000Z"
            )
            {
              employeeId
            #  startedAt
            #  endedAt
              jobId
              departmentId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeJobhistory: jobhistoriesService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
