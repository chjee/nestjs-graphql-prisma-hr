import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { LocationsService } from '../src/locations/locations.service';

describe('LocationsResolver (e2e)', () => {
  let app: INestApplication;
  const locationsService = {
    create: () => mockLocation,
    findAll: () => [mockLocation],
    findOne: () => mockLocation,
    update: () => mockLocation,
    remove: () => mockLocation,
  };

  const mockLocation = {
    streetAddress: '93091 Calle della Testa',
    postalCode: '10934',
    city: 'Seoul',
    stateProvince: 'Seocho',
    countryId: 'KR',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(LocationsService)
      .useValue(locationsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('createLocation', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createLocation(
              createLocationInput: {
                streetAddress: "93091 Calle della Testa",
                postalCode: "10934",
                city: "Seoul",
                stateProvince: "Seocho",
                countryId: "KR",
            })
            {
              streetAddress
              postalCode
              city
              stateProvince
              countryId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { createLocation: locationsService.create() } });
  });

  it('findAll', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getLocations(skip:0, take:2)
            {
              streetAddress
              postalCode
              city
              stateProvince
              countryId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getLocations: locationsService.findAll() } });
  });

  it('findOne', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getLocationById(id: 1000)
            {
              streetAddress
              postalCode
              city
              stateProvince
              countryId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { getLocationById: locationsService.findOne() } });
  });

  it('updateLocation', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateLocation(id: 3202, 
              updateLocationInput: {
                streetAddress: "sinsa-dong",
                postalCode: "10934",
                city: "Seoul",
                stateProvince: "Seocho",
                countryId: "KR",
            })
            {
              streetAddress
              postalCode
              city
              stateProvince
              countryId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { updateLocation: locationsService.update() } });
  });

  it('removeLocation', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeLocation(id: 3202)
            {
              streetAddress
              postalCode
              city
              stateProvince
              countryId
            }
          }
        `,
      })
      .expect(HttpStatus.OK)
      .expect({ data: { removeLocation: locationsService.remove() } });
  });

  afterAll(async () => {
    await app.close();
  });
});
