import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource }    from 'typeorm';

import { TypeOrmConfigService } from '@infrastructure/config/typeorm/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
  ],
  providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
