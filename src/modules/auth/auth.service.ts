import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestOtpInput } from './dto/request-otp.input';
import { UserService } from '../user/user.service';
import { OtpRequestsService } from '../otp-requests/otp-requests.service';

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

    if (!result || typeof result !== 'object' || !('id' in result)) {
      throw new BadRequestException(
        'User with this mobile number already exists. Please try with a different mobile number.',
      );
    }

    const otpResultData = await this.otpRequestsService.create({
      user_id: result.id,
      otp_code: otp,
    });
    return otpResultData;
  }
}
