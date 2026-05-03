import { LoggerService, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaMutationError(
  error: unknown,
  modelName: string,
  where: unknown,
  logger?: LoggerService,
): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    logger?.warn(`${modelName} not found: ${JSON.stringify(where)}`);
    throw new NotFoundException(`${modelName} not found`);
  }

  throw error;
}
