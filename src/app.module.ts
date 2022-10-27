import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { ExceptionsModule }    from '@infrastructure/exceptions/exceptions.module';
import { getEnvPath }          from '@infrastructure/helpers/env.helper';
import { LoggerModule }        from '@infrastructure/logger/logger.module';
import { RepositoriesModule }  from '@infrastructure/repositories/repositories.module';
import appConfig               from '@infrastructure/config/environment/app.config';
import authConfig              from '@infrastructure/config/environment/auth.config';
import databaseConfig          from '@infrastructure/config/environment/database.config';

import { DomainModule } from '@domain/domain.module';

import { AuthModule }    from './module/auth/auth.module';
import { UserModule }    from './module/user/user.module';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

const envFilePath: string = getEnvPath(`${ __dirname }/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        databaseConfig
      ]
    }),
    TypeOrmConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    DomainModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
