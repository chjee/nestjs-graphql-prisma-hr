<h1 align="center">Welcome to nestjs-graphql-prisma-hr 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.17.1-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D9.6.7-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: UNLICENSED" src="https://img.shields.io/badge/License-UNLICENSED-yellow.svg" />
  </a>
</p>

> NestJS, GraphQL, Prisma, MySQL, Typescript, Jest, Supertest를 이용한 HR API

## Prerequisites

- node >=18.17.1
- npm >=9.6.7

## Install

```sh
$ npm install
```

## Usage

```sh
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```sh
# unit and contract tests under src/**/*.spec.ts
$ npm run test

# unit tests with watch mode
$ npm run test:watch

# unit tests with coverage
$ npm run test:cov

# mocked resolver e2e tests under test/*.e2e-spec.ts
$ npm run test:e2e

# production build
$ npm run build

# typecheck without emitting files
$ npx tsc --noEmit --pretty false

# eslint check; note package script runs eslint with --fix
$ npx eslint "{src,apps,libs,test}/**/*.ts"
```

### Test scope

- `npm run test` runs Jest with `rootDir: src`. It includes unit tests and
  contract tests such as:
  - `src/common/graphql-schema-contract.spec.ts` for the public GraphQL schema
    snapshot and high-risk schema assertions.
  - `src/common/nullability-contract.spec.ts` for Prisma-backed GraphQL and DTO
    nullability expectations.
  - `src/common/utils/prisma-mutation-services.spec.ts` and
    `src/common/utils/prisma-query-policy-services.spec.ts` for cross-service
    Prisma behavior.
- `npm run test:e2e` runs the resolver e2e specs in `test/*.e2e-spec.ts`. These
  tests intentionally use mocked domain services plus a mocked `PrismaService`
  through `test/e2e-test-utils.ts`, so they do not require `DATABASE_URL` or a
  running MySQL instance. They verify GraphQL/resolver wiring and request
  bootstrap behavior, not real database persistence.
- Real database-backed e2e coverage is not part of the current default test
  profile. Add a separate profile or explicit setup before asserting Prisma/MySQL
  integration behavior end to end.

### GraphQL schema snapshot

The committed GraphQL schema snapshot lives at:

```text
src/common/__snapshots__/graphql-schema-contract.spec.ts.snap
```

Use it as a schema-diff gate when changing public GraphQL contracts:

```sh
# run the schema contract test
$ npm test -- --runInBand src/common/graphql-schema-contract.spec.ts

# intentionally update the snapshot after reviewing the schema diff
$ npm test -- --runInBand src/common/graphql-schema-contract.spec.ts -u
```

The schema contract test builds the resolver schema without starting the
database-backed `AppModule`. It snapshots a lexicographically sorted schema and
asserts key contracts directly, including:

- `User.password` is not exposed on the public `User` object type.
- `loginUser` remains present as the auth mutation entrypoint.
- Top-level list queries expose `skip` and `take`.
- Relation list fields expose `skip` and `take`.

Update the snapshot only when the GraphQL contract change is intentional and the
diff has been reviewed.

## Other commands

```sh
# generate prisma client
$ npx prisma generate

# database migration
$ npx prisma db seed --preview-feature

# run migration
$ npx prisma migrate dev -name init

# revert migration
$ npx run migrate reset
```

## .env file

```sh
PORT=3000
DATABASE_URL="mysql://username:password@localhost:3306//hrms?schema=public"
JWT_SECRET=MDBjMWJlMzc4M2JhNGExY2FmNTRkZmU0NjlhNTRjYmY=
```

## Author

👤 **Changhoon Jee <chjee71@gmail.com>**

- Github: [@chjee](https://github.com/chjee)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
