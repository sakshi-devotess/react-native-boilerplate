import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpRequestsModule } from '../otp-requests/otp-requests.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, OtpRequestsModule],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
