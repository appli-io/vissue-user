import { Module }         from '@nestjs/common';
import { UserRepository } from '@domain/repository/user.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DomainModule {}
