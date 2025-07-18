import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { baseController } from 'src/core/baseController';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { SetMpinInput, VerifyMpinInput } from './dto/set-mpin.input';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { RefreshTokenAuthGuard } from 'src/core/guards/refresh-token-guard';
import { CurrentUserDto } from 'src/core/guards/current-user.dto';
import { CurrentUser } from 'src/commons/decorator/current-user.decorator';
import { RefreshToken } from './dto/refresh.input';
import { ChangeMyMpinInput } from './dto/change-my-mpin.input';

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

  @SkipAuth()
  @Post('/resend-otp')
  async resendOtp(
    @Body() data: RequestOtpInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.requestOtp(data);
    return baseController.getResult(res, 200, result, 'OTP Send Successfully.');
  }

  @SkipAuth()
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
    @Body() data: SetMpinInput,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.setMpin(data);
    return baseController.getResult(res, 200, result, 'Mpin set Successfully.');
  }

  @SkipAuth()
  @Post('/verify-mpin')
  async verifyMpin(
    @Body() data: VerifyMpinInput,
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

  @SkipAuth()
  @Post('/refresh')
  @UseGuards(RefreshTokenAuthGuard)
  async refresh(
    @Body() token: RefreshToken,
    @CurrentUser() currentUser: CurrentUserDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.refresh(currentUser?.user_id);
    return baseController.getResult(
      res,
      200,
      result,
      'Mpin Verified Successfully.',
    );
  }

  @Post('/change-my-mpin')
  async changeMyMpin(
    @Body() data: ChangeMyMpinInput,
    @CurrentUser() currentUser: CurrentUserDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.changeMyMpin(
      currentUser.user_id,
      data,
    );
    return baseController.getResult(
      res,
      200,
      result,
      'Mpin Changed Successfully.',
    );
  }
}
