import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { applyAppConfig } from '../src/configure-app';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Database-backed GraphQL e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;

  const testEmail = `db-e2e-${Date.now()}@prisma.io`;
  const testPassword = 'whoami';

  async function gql(query: string, token?: string) {
    const call = request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(HttpStatus.OK);

    if (token) {
      call.set('Authorization', `Bearer ${token}`);
    }

    return call;
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    applyAppConfig(app);
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  afterAll(async () => {
    await prisma?.user.deleteMany({ where: { email: testEmail } });
    await app?.close();
  });

  it('authenticates a seeded user through the real database', async () => {
    const response = await gql(`
      mutation {
        loginUser(signInInput: { email: "alice@prisma.io", password: "whoami" }) {
          token
        }
      }
    `);

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.loginUser.token).toEqual(expect.any(String));

    authToken = response.body.data.loginUser.token;
  });

  it('persists protected user mutations and keeps passwords out of GraphQL output', async () => {
    const createResponse = await gql(
      `
        mutation {
          createUser(
            createUserInput: {
              email: "${testEmail}"
              name: "DbGate"
              password: "${testPassword}"
              role: "USER"
            }
          ) {
            id
            name
            email
            role
          }
        }
      `,
      authToken,
    );

    expect(createResponse.body.errors).toBeUndefined();
    expect(createResponse.body.data.createUser).toMatchObject({
      name: 'DbGate',
      email: testEmail,
      role: 'USER',
    });
    expect(createResponse.body.data.createUser.password).toBeUndefined();

    const createdId = createResponse.body.data.createUser.id;
    expect(createdId).toEqual(expect.any(Number));

    const loginResponse = await gql(`
      mutation {
        loginUser(signInInput: { email: "${testEmail}", password: "${testPassword}" }) {
          token
        }
      }
    `);

    expect(loginResponse.body.errors).toBeUndefined();
    expect(loginResponse.body.data.loginUser.token).toEqual(expect.any(String));

    const listResponse = await gql(
      `
        query {
          getUsers(skip: 0, take: 2) {
            id
            email
            role
          }
        }
      `,
      authToken,
    );

    expect(listResponse.body.errors).toBeUndefined();
    expect(listResponse.body.data.getUsers).toHaveLength(2);
    expect(listResponse.body.data.getUsers[0].password).toBeUndefined();

    const removeResponse = await gql(
      `
        mutation {
          removeUser(id: ${createdId}) {
            id
            email
          }
        }
      `,
      authToken,
    );

    expect(removeResponse.body.errors).toBeUndefined();
    expect(removeResponse.body.data.removeUser).toMatchObject({
      id: createdId,
      email: testEmail,
    });
  });
});
