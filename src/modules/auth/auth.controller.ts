import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { baseController } from 'src/core/baseController';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/request-otp')
  async requestOtp(
    @Body() data: RequestOtpInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.requestOtp(data);
    return baseController.getResult(res, 200, result, 'OTP Send Successfully.');
  }
}
