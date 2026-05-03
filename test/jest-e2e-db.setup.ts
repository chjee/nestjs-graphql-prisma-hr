if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is required for DB-backed e2e tests. Run migrations and seed against a dedicated test database before npm run test:e2e:db.',
  );
}

process.env.JWT_SECRET ??= 'db-e2e-test-secret';

jest.setTimeout(30000);
