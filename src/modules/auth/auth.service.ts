import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestOtpInput } from './dto/request-otp.input';
import { UserService } from '../user/user.service';
import { OtpRequestsService } from '../otp-requests/otp-requests.service';
import { VerifyOtpInput } from './dto/verify-otp.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private otpRequestsService: OtpRequestsService,
  ) {}

  async requestOtp(data: RequestOtpInput): Promise<any> {
    const { mobile } = data;
    const otp = '123456';
    const result = await this.userService.create({
      mobile,
    });

    const otpResultData = await this.otpRequestsService.create({
      user_id: result.id,
      otp_code: otp,
    });
    return otpResultData;
  }

  async verifyOtp(data: VerifyOtpInput): Promise<any> {
    const { mobile, otp } = data;
    const userData = await this.userService.findOne({
      where: { mobile },
    });

    if (!userData) {
      throw new BadRequestException('User not found');
    }

    const otpRequests = await this.otpRequestsService.find({
      where: { user_id: userData.id },
      order: { created: 'DESC' },
      take: 1,
    });

    if (!otpRequests || otpRequests.length === 0) {
      throw new BadRequestException('OTP request not found');
    }

    const otpRequestData = otpRequests[0];
    console.log('otpRequestData :>> ', otpRequestData);
    if (otpRequestData.otp_code !== otp || otpRequestData.is_used) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.otpRequestsService.update(otpRequestData.id, {
      id: otpRequestData.id,
      is_used: true,
    });

    return { message: 'OTP verified successfully', user: userData };
  }
}
