import { NestFactory } from '@nestjs/core';
import { Transport }   from '@nestjs/microservices';

import { AllExceptionFilter } from '@infrastructure/filter/exceptions.filter';
import { LoggerService }      from '@infrastructure/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

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
