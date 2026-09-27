import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(import.meta.dirname, '..', 'photos'), {
    prefix: '/photos/',
  });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
