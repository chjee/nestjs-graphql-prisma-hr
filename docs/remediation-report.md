# Security and correctness remediation report

Date: 2026-05-03
Branch: `p2-remediation-final-report`
Baseline: `main`
Integrated target: `develop` at `f5a2469`

## Scope

This report closes the staged security/correctness hardening work that was executed on
`develop`. It maps the original remediation plan to the implemented commits,
verification evidence, and remaining release risks. This branch is documentation-only;
it does not change runtime behavior.

## Commit sequence

| Commit    | Outcome                                                                                                                                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ec34711` | Hardened login by replacing plaintext password checks with Node `crypto.scrypt`, hashing seed/user passwords, omitting password from GraphQL output, enforcing JWT secret configuration, and normalizing Prisma `P2025` mutation failures to `NotFoundException`. |
| `b6bd68c` | Fixed `profile` lookup to use `userId`, aligned nullable GraphQL contracts with Prisma behavior, and added nullability regression coverage.                                                                                                                       |
| `c514b8d` | Locked the nullable GraphQL contract after review feedback.                                                                                                                                                                                                       |
| `cad91a3` | Normalized the custom Date scalar to Unix epoch seconds.                                                                                                                                                                                                          |
| `ced18e3` | Rejected ambiguous Date scalar numeric timestamps and added regression coverage.                                                                                                                                                                                  |
| `36d8058` | Untangled feature module service ownership and removed cross-module provider duplication.                                                                                                                                                                         |
| `2ae411f` | Made feature modules compile independently with explicit owning-service exports/imports.                                                                                                                                                                          |
| `fd8771c` | Added bounded default list query policy with stable ordering for top-level list queries.                                                                                                                                                                          |
| `31d0903` | Exposed `skip`/`take` pagination arguments on relation list fields.                                                                                                                                                                                               |
| `534f4bc` | Shared production app bootstrap configuration, including validation pipe settings and shutdown hooks.                                                                                                                                                             |
| `2a4346e` | Made e2e resolver specs run in the default mocked profile without database bootstrap.                                                                                                                                                                             |
| `428c05a` | Added a generated GraphQL schema snapshot contract.                                                                                                                                                                                                               |
| `8979f6c` | Included auth mutations in the schema contract and asserted public auth/API shapes.                                                                                                                                                                               |
| `f5a2469` | Documented test profiles and schema snapshot maintenance in `README.md`.                                                                                                                                                                                          |

## Acceptance criteria status

| Area                              | Status | Evidence                                                                                                                                                                                    |
| --------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password/auth hardening           | Done   | `src/common/utils/password.util.ts`, `src/auth/auth.service.ts`, `src/users/users.service.ts`, `prisma/seed.ts`, `src/common/utils/password.util.spec.ts`, `src/auth/auth.service.spec.ts`. |
| JWT secret safety                 | Done   | `src/common/utils/jwt-secret.util.ts`, `src/common/constants/jwt.constants.ts`, `src/common/guards/jwt.strategy.ts`, `src/common/utils/jwt-secret.util.spec.ts`.                            |
| Prisma mutation not-found mapping | Done   | `src/common/utils/prisma-error.util.ts`, service update/remove paths, `src/common/utils/prisma-mutation-services.spec.ts`.                                                                  |
| Profile lookup and nullability    | Done   | `src/users/users.resolver.ts`, `src/common/nullability-contract.spec.ts`, resolver/service specs.                                                                                           |
| Date scalar semantics             | Done   | `src/common/scalars/date.scalar.ts`, `src/common/scalars/date.scalar.spec.ts`.                                                                                                              |
| Module boundaries                 | Done   | Feature module imports/exports and AppModule compile verification.                                                                                                                          |
| Bounded list queries              | Done   | `src/common/utils/query-policy.util.ts`, `src/common/utils/prisma-query-policy-services.spec.ts`, relation resolver specs.                                                                  |
| Production bootstrap validation   | Done   | `src/configure-app.ts`, `src/main.ts`, `src/configure-app.spec.ts`, e2e init helper.                                                                                                        |
| Mocked e2e default profile        | Done   | `test/e2e-test-utils.ts`, `test/jest-e2e.setup.ts`, resolver e2e suites.                                                                                                                    |
| DB-backed e2e release gate        | Done   | `test/database.db-e2e.ts`, `test/jest-e2e-db.json`, `test/jest-e2e-db.setup.ts`, `npm run test:e2e:db`.                                                                                     |
| GraphQL schema contract           | Done   | `src/common/graphql-schema-contract.spec.ts`, `src/common/__snapshots__/graphql-schema-contract.spec.ts.snap`.                                                                              |
| Test/profile documentation        | Done   | `README.md`.                                                                                                                                                                                |

## Verification checklist

The final documentation branch was verified with:

- `npx prettier --check docs/remediation-report.md`
- `git diff --check`
- `npm test -- --runInBand`
- `npm run test:e2e -- --runInBand`
- `npm run test:e2e:db` against a migrated and seeded disposable MySQL database
- `npx tsc --noEmit --pretty false`
- `npm run build`
- `npx eslint "{src,apps,libs,test}/**/*.ts"`
- `JWT_SECRET=test-secret npx ts-node -e "...AppModule compile..."`

Latest verification evidence for this report:

- Unit/schema suites: 29 suites, 209 tests, 1 snapshot passed.
- Mocked e2e suites: 9 suites, 45 tests passed.
- DB-backed e2e release gate: 1 suite, 2 tests passed.

## Known gaps and release risks

- Real database-backed e2e coverage is now available as an explicit release-gate
  profile through `npm run test:e2e:db`, but it still requires a migrated and
  seeded disposable MySQL database.
- The GraphQL schema snapshot is generated from Nest resolver metadata. It protects
  the public schema contract, but it does not prove database behavior.
- Coverage thresholds are not enforced by this report. If coverage becomes a release
  gate, run `npm run test:cov -- --runInBand` and record the result separately.
- README rendering was not browser-rendered; only Markdown formatting was checked.

## Remaining release decisions

1. Promote `develop` to `main` after review because the DB-backed e2e release
   gate has passed against a disposable MySQL database.
2. If coverage becomes a future release gate, run `npm run test:cov -- --runInBand`
   and record the result in a follow-up report or release note.
