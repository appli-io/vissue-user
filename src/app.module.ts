import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule }     from '@infrastructure/config/typeorm/typeorm.module';
import { ExceptionsModule }        from '@infrastructure/exceptions/exceptions.module';
import { getEnvPath }              from '@infrastructure/helpers/env.helper';
import { LoggerModule }            from '@infrastructure/logger/logger.module';
import { RepositoriesModule }      from '@infrastructure/repositories/repositories.module';

import { DomainModule }  from '@domain/domain.module';

import { UserModule }    from './module/user/user.module';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

const envFilePath: string = getEnvPath(`${ __dirname }/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath, isGlobal: true}),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UserModule,
    DomainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
