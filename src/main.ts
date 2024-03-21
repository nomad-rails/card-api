import { consola } from 'consola';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '$lib/rest/transform.interceptor';
import { HttpExceptionFilter } from '$lib/rest/http-exception.filter';

// Merge the console object with the consola object
Object.assign(console, consola);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const cfg = app.get(ConfigService<Config>);
  const port = parseInt(cfg.getOrThrow('PORT'), 10) || 3000;

  await app.listen(port);
  console.success(`Listening on port http://localhost:${port}`);
}
bootstrap();
