import { NestFactory } from '@nestjs/core';
import { Transport }   from '@nestjs/microservices';

import { AllExceptionFilter } from '@infrastructure/common/filter/exceptions.filter';
import { LoggerService }      from '@infrastructure/logger/logger.service';

import { AppModule }           from './app.module';
import { ResponseInterceptor } from '@infrastructure/common/interceptor/response.interceptor';
import { LoggerInterceptor }   from '@infrastructure/common/interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010
    }
  });

  await app.startAllMicroservices();
  await app.listen(3010);
}

bootstrap().then();
