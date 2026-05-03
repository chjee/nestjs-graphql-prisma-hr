import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { handlePrismaMutationError } from './prisma-error.util';

function prismaError(code: string) {
  return new Prisma.PrismaClientKnownRequestError('Prisma error', {
    code,
    clientVersion: 'test',
  });
}

describe('handlePrismaMutationError', () => {
  it('maps Prisma P2025 to a Nest not-found exception', () => {
    expect(() =>
      handlePrismaMutationError(prismaError('P2025'), 'User', { id: 1 }),
    ).toThrow(NotFoundException);
  });

  it('rethrows non-P2025 Prisma errors', () => {
    const error = prismaError('P2002');
    expect(() => handlePrismaMutationError(error, 'User', { id: 1 })).toThrow(
      error,
    );
  });

  it('keeps all update/remove service catch blocks wired to the shared handler', () => {
    const services = [
      'countries/countries.service.ts',
      'departments/departments.service.ts',
      'employees/employees.service.ts',
      'jobhistories/jobhistories.service.ts',
      'jobs/jobs.service.ts',
      'locations/locations.service.ts',
      'profiles/profiles.service.ts',
      'regions/regions.service.ts',
      'users/users.service.ts',
    ];
    const srcRoot = resolve(__dirname, '../..');

    for (const service of services) {
      const servicePath = resolve(srcRoot, service);
      expect(existsSync(servicePath)).toBe(true);
      const source = readFileSync(servicePath, 'utf8');
      const catchCount = (source.match(/catch \(e\)/g) ?? []).length;
      const handlerCount = (source.match(/handlePrismaMutationError/g) ?? [])
        .length;

      expect(catchCount).toBe(2);
      expect(handlerCount).toBeGreaterThanOrEqual(catchCount + 1);
      expect(source).not.toMatch(
        /PrismaClientKnownRequestError[\s\S]*logger\.log/,
      );
    }
  });
});
