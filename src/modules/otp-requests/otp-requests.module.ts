import { Module } from '@nestjs/common';
import { OtpRequestsService } from './otp-requests.service';
import { OtpRequestsController } from './otp-requests.controller';

@Module({
  providers: [OtpRequestsService],
  controllers: [OtpRequestsController],
  exports: [OtpRequestsService],
})
export class OtpRequestsModule {}
