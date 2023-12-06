import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { JobsService } from '../src/jobs/jobs.service';

describe('JobsResolver (e2e)', () => {
  let app: INestApplication;
  const jobsService = {
    create: () => mockJob,
    findAll: () => [mockJob],
    findOne: () => mockJob,
    update: () => mockJob,
    remove: () => mockJob,
  };

  const mockJob = {
    id: 'AC_MGR',
    title: 'Accounting Manager',
    minSalary: 100000,
    maxSalary: 200000,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(JobsService)
      .useValue(jobsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createJob', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createJob(
              createJobInput: {
                  id: "IT_MGR",
                  title: "IT Manager",
                  minSalary: 100000,
                  maxSalary: 200000,
             })
             {
              id
              title
              minSalary
              maxSalary
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createJob: jobsService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getJobs(skip:0, take:2)
            {
              id
              title
              minSalary
              maxSalary
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getJobs: jobsService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getJobById(id: "IT_PROG")
            {
              id
              title
              minSalary
              maxSalary
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getJobById: jobsService.findOne() } });
  });

  it('updateJob', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateJob(id: "IT_MGR", 
              updateJobInput: {
                title: "IT_ASST",
                minSalary: 80000
                maxSalary: 15000
            })
            {
              id
              title
              minSalary
              maxSalary
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateJob: jobsService.update() } });
  });

  it('removeJob', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeJob(id: "IT_MGR")
            {
              id
              title
              minSalary
              maxSalary
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeJob: jobsService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
