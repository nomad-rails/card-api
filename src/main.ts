import { consola } from 'consola';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@lib/rest/transform.interceptor';
import { HttpExceptionFilter } from '@lib/rest/http-exception.filter';

// Merge the console object with the consola object
Object.assign(console, consola);

export let nest: INestApplication;

async function bootstrapSwagger(
  app: INestApplication,
  path = '/',
  isSwaggerEnabled = false,
) {
  if (!isSwaggerEnabled) return;
  if (!path.startsWith('/')) path = `/${path}`;
  const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
  const options = new DocumentBuilder()
    .setTitle('Nomad Card API')
    .setVersion('1.0')
    .addSecurity('jwt', {
      type: 'http',
      in: 'header',
      scheme: 'bearer',
    })
    .addTag('Main', 'Main operations')
    .addTag('Auth', 'Authentication operations')
    .addTag('Cardholder', 'Cardholder operations')
    .addTag('Card', 'Card operations')
    .addTag('Seabed Labs', 'Seabed Labs operations')
    .addTag('Webhook', 'Webhook operations')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: 'Nomad Card API',
    customCss: '.swagger-ui .topbar { display: none }',
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  nest = app;

  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const cfg = app.get(ConfigService<Config>);
  const port = parseInt(cfg.getOrThrow('PORT'), 10) || 3000;
  const enableSwagger = cfg.getOrThrow('ENABLE_SWAGGER');
  const swaggerPath = cfg.getOrThrow('SWAGGER_PATH');
  const isSwaggerEnabled = enableSwagger === 'true';

  await bootstrapSwagger(app, swaggerPath, isSwaggerEnabled);
  await app.listen(port);

  console.info(`Swagger enabled: ${isSwaggerEnabled ? 'yes' : 'no'}`);
  if (isSwaggerEnabled) console.info(`Swagger path: ${swaggerPath}`);
  console.success(`Listening on port http://localhost:${port}`);
}
bootstrap();
