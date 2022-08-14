import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';
import { Transport }   from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
