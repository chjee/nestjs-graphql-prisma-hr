import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { applyAppConfig } from './configure-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  applyAppConfig(app);

  const configService = app.get(ConfigService);
  const listenPort = configService.get('PORT', 3000);
  await app.listen(listenPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
