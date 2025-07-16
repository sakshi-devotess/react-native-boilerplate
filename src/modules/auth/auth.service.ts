import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestOtpInput } from './dto/request-otp.input';
import { UserService } from '../user/user.service';
import { OtpRequestsService } from '../otp-requests/otp-requests.service';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { SetMpinInput, VerifyMpinInput } from './dto/set-mpin.input';
import * as bcrypt from 'bcrypt';
import { TOKEN_TIME } from 'src/commons/constant';
import { config } from 'src/commons/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private otpRequestsService: OtpRequestsService,
    private jwtService: JwtService,
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
    const userData = await this.getUserByMobile(mobile);

    const otpRequests = await this.otpRequestsService.find({
      where: { user_id: userData.id },
      order: { created: 'DESC' },
      take: 1,
    });

    if (!otpRequests || otpRequests.length === 0) {
      throw new BadRequestException('OTP request not found');
    }

    const otpRequestData = otpRequests[0];
    if (otpRequestData.otp_code !== otp || otpRequestData.is_used) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.otpRequestsService.update(otpRequestData.id, {
      id: otpRequestData.id,
      is_used: true,
    });

    return { message: 'OTP verified successfully', user: userData };
  }

  async setMpin(data: SetMpinInput) {
    const { mobile, mpin } = data;
    const userData = await this.getUserByMobile(mobile);

    const isOtpVerified = await this.userService.find({
      where: {
        mobile: mobile,
        otp_requests_s: {
          is_used: true,
        },
      },
      relations: ['otp_requests_s'],
    });
    if (!isOtpVerified.length) {
      throw new BadRequestException('Your Mobile number is not verified!');
    }

    if (userData.mpin !== null) {
      const isMatch = await bcrypt.compare(mpin, userData.mpin);

      if (isMatch) {
        throw new BadRequestException(
          'Your mpin is the same as your previous mpin. Please enter a different mpin!',
        );
      }
    }

    const hashedMpin = await bcrypt.hash(mpin, 6);
    userData.mpin = hashedMpin;
    await this.userService.update(userData.id, userData);
    const tokens = await this.createTokens(userData.id, null);
    return { message: 'Mpin set successfully', user: userData, tokens };
  }

  async verifyMpin(data: VerifyMpinInput) {
    const { mobile, mpin } = data;
    const userData = await this.getUserByMobile(mobile);

    const isMatch = await bcrypt.compare(mpin, userData.mpin);
    if (!isMatch) {
      throw new BadRequestException('Invalid Mpin');
    }

    const tokens = await this.createTokens(userData.id, null);

    return { message: 'Mpin verified successfully', user: userData, tokens };
  }

  private async getUserByMobile(mobile: string) {
    const userData = await this.userService.findOne({ where: { mobile } });
    if (!userData) {
      throw new BadRequestException('User not found');
    }
    return userData;
  }

  private async createTokens(user_id: number, secret: string | null = null) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user_id,
        },
        secret
          ? {
              secret: secret,
              expiresIn: TOKEN_TIME.ACCESS_TOKEN_TIME,
            }
          : {
              expiresIn: TOKEN_TIME.ACCESS_TOKEN_TIME,
            },
      ),
      this.jwtService.signAsync(
        {
          id: user_id,
        },
        {
          secret: config.REFRESH_KEY,
          expiresIn: TOKEN_TIME.REFRESH_TOKEN_TIME,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
