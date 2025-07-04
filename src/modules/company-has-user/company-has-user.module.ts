import { Module } from '@nestjs/common';
import { CompanyHasUserService } from './company-has-user.service';
import { CompanyHasUserController } from './company-has-user.controller';

@Module({
  providers: [CompanyHasUserService],
  controllers: [CompanyHasUserController],
  exports: [CompanyHasUserService],
})
export class CompanyHasUserModule {}
