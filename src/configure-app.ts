import { INestApplication, ValidationPipe } from '@nestjs/common';

export function applyAppConfig(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  return app;
}
