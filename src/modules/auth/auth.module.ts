import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpRequestsModule } from '../otp-requests/otp-requests.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/commons/config';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    OtpRequestsModule,
    JwtModule.register({
      secret: config.ACCESS_KEY,
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [],
})
export class AuthModule {}
