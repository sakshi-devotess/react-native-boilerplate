import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { baseController } from 'src/core/baseController';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { VerifyOrSetMpinInput } from './dto/set-mpin.input';
import { SkipAuth } from 'src/core/guards/auth-guard';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/request-otp')
  async requestOtp(
    @Body() data: RequestOtpInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.requestOtp(data);
    return baseController.getResult(res, 200, result, 'OTP Send Successfully.');
  }

  // @SkipAuth()
  @Post('/verify-otp')
  async verifyOtp(
    @Body() data: VerifyOtpInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.verifyOtp(data);
    return baseController.getResult(
      res,
      200,
      result,
      'OTP Verified Successfully.',
    );
  }

  @SkipAuth()
  @Post('/set-mpin')
  async setMpin(
    @Body() data: VerifyOrSetMpinInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.setMpin(data);
    return baseController.getResult(res, 200, result, 'Mpin set Successfully.');
  }

  @SkipAuth()
  @Post('/verify-mpin')
  async verifyMpin(
    @Body() data: VerifyOrSetMpinInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.verifyMpin(data);
    return baseController.getResult(
      res,
      200,
      result,
      'Mpin Verified Successfully.',
    );
  }
}
