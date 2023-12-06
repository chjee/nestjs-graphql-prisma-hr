import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { RegionsService } from '../src/regions/regions.service';

describe('RegionsResolver (e2e)', () => {
  let app: INestApplication;
  const regionsService = {
    create: () => mockRegion,
    findAll: () => [mockRegion],
    findOne: () => mockRegion,
    update: () => mockRegion,
    remove: () => mockRegion,
  };

  const mockRegion = {
    id: 5,
    name: 'Antarctica',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(RegionsService)
      .useValue(regionsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createRegion', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createRegion(
              createRegionInput: {
                id: 5,
                name: "Antarctica",
            })
            {
              id
              name
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createRegion: regionsService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getRegions(skip:0, take:2)
            {
              id
              name
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getRegions: regionsService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getRegionById(id: 1)
            {
              id
              name
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getRegionById: regionsService.findOne() } });
  });

  it('updateRegion', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateRegion(id: 1, 
              updateRegionInput: {
                name: "Antarctic Continent"
            })
            {
              id
              name
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateRegion: regionsService.update() } });
  });

  it('removeRegion', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeRegion(id: 1)
            {
              id
              name
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeRegion: regionsService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
