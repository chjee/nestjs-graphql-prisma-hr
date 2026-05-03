import { Body, Controller, INestApplication, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import * as request from 'supertest';
import { applyAppConfig } from './configure-app';

class CreateFixtureDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  count: number;
}

@Controller('fixtures')
class FixtureController {
  @Post()
  create(@Body() body: CreateFixtureDto) {
    return body;
  }
}

describe('applyAppConfig', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FixtureController],
    }).compile();

    app = moduleRef.createNestApplication();
    applyAppConfig(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects non-whitelisted properties', async () => {
    await request(app.getHttpServer())
      .post('/fixtures')
      .send({ name: 'fixture', count: 1, extra: 'blocked' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toContain('property extra should not exist');
      });
  });

  it('transforms primitive request values before validation', async () => {
    await request(app.getHttpServer())
      .post('/fixtures')
      .send({ name: 'fixture', count: '3' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({ name: 'fixture', count: 3 });
      });
  });
});
