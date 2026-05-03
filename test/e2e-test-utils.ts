import { INestApplication } from '@nestjs/common';
import { TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { applyAppConfig } from '../src/configure-app';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { PrismaService } from '../src/prisma/prisma.service';

export const e2ePrismaServiceMock = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

export function applyCommonE2eOverrides(
  builder: TestingModuleBuilder,
): TestingModuleBuilder {
  return builder
    .overrideProvider(JwtAuthGuard)
    .useValue({ canActivate: () => true })
    .overrideProvider(PrismaService)
    .useValue(e2ePrismaServiceMock);
}

export async function initE2eApp(
  moduleRef: TestingModule,
): Promise<INestApplication> {
  const app = moduleRef.createNestApplication();
  applyAppConfig(app);
  await app.init();

  return app;
}
