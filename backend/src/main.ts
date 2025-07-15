import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');

  // Setup Swagger
  const apiVersion = process.env.API_VERSION || 'v1';
  const options = new DocumentBuilder()
    .setTitle('Aptoso Project API document')
    .setDescription('Document for Aptoso API')
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Global Validation Custom
  app.useGlobalPipes(new ValidationPipe());

  // Response Transformer Mapping
  // Log request & response information
  app.useGlobalInterceptors(
    new LoggingInterceptor(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );

  // HttpException custom
  app.useGlobalFilters(
    new HttpExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );

  app.use(
    session({
      secret: 'some-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  app.get(Reflector);

  // Start API
  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  await app.listen(PORT, () =>
    console.log(`Open http://localhost:${PORT}/docs to see the documentation`),
  );
}
bootstrap();
