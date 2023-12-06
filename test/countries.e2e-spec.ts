import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { CountriesService } from '../src/countries/countries.service';

describe('CountriesResolver (e2e)', () => {
  let app: INestApplication;
  const countriesService = {
    create: () => mockCountry,
    findAll: () => [mockCountry],
    findOne: () => mockCountry,
    update: () => mockCountry,
    remove: () => mockCountry,
  };

  const mockCountry = {
    id: 'KR',
    name: 'Korea',
    regionId: 3,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(CountriesService)
      .useValue(countriesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createCountry', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createCountry(
              createCountryInput: {
                id: "KR",
                name: "Korea",
                regionId: 3,
            })
            {
              id
              name
              regionId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createCountry: countriesService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getCountries(skip:0, take:2) {
              id
              name
              regionId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getCountries: countriesService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getCountryById(id: "KR")
            {
              id
              name
              regionId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getCountryById: countriesService.findOne() } });
  });

  it('updateCountry', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateCountry(id: "KR", 
              updateCountryInput: {
                name: "Republic of Korea"
                regionId: 3
            })
            {
              id
              name
              regionId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateCountry: countriesService.update() } });
  });

  it('removeCountry', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeCountry(id: "KR")
            {
              id
              name
              regionId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeCountry: countriesService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
