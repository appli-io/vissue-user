import { NestFactory }                    from '@nestjs/core';
import { Transport }                      from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe }                 from '@nestjs/common';

import { AllExceptionFilter }  from '@infrastructure/common/filter/exceptions.filter';
import { ResponseInterceptor } from '@infrastructure/common/interceptor/response.interceptor';
import { LoggerService }       from '@infrastructure/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,                    // Ignorar datos que no esten en los DTO
      forbidNonWhitelisted: true,         // Lanzar error si existen datos prohibidos
      disableErrorMessages: true,         // Desabilitar mensajes de error (producción)
    })
  );

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Vissue User Microservice')
    .setDescription('The Vissue User Microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3010);
}

bootstrap().then();
