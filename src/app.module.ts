import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule }     from '@infrastructure/config/typeorm/typeorm.module';
import { ExceptionsModule }        from '@infrastructure/exceptions/exceptions.module';
import { getEnvPath }              from '@infrastructure/helpers/env.helper';
import { LoggerModule }            from '@infrastructure/logger/logger.module';
import { RepositoriesModule }      from '@infrastructure/repositories/repositories.module';

import { UserModule }    from './module/user/user.module';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

const envFilePath: string = getEnvPath(`${ __dirname }/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath, isGlobal: true}),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'user-pass',
      database: 'ms-user',
      synchronize: true,
      entities: [User]
    }),*/
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
