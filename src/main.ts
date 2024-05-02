import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/exceptions/global-exception.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: '251 CEO Dashboard System API Documentation',
  };
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('251 CEO Dashboard API')
      .setDescription(
        `My 251 CEO Dashboard API. Version: ${process.env.VERSION}`,
      )
      .addBearerAuth()
      .build(),
    {
      deepScanRoutes: true,
    },
  );

  SwaggerModule.setup('docs', app, document, customOptions);

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, () => {
    console.log('[WEB]', process.env.BASE_URL + '/docs');
  });
}
bootstrap();
