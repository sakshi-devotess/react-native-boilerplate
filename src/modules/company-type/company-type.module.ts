import { Module } from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeController } from './company-type.controller';

@Module({
  providers: [CompanyTypeService],
  controllers: [CompanyTypeController],
  exports: [CompanyTypeService],
})
export class CompanyTypeModule {}
