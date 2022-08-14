import { Module }        from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService }    from './app.service';
import { User }          from './module/user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule }    from './module/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'user-pass',
      database: 'ms-user',
      synchronize: true,
      entities: [User]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
