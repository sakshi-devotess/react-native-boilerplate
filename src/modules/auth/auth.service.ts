import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RequestOtpInput } from './dto/request-otp.input';
import { UserService } from '../user/user.service';
import { OtpRequestsService } from '../otp-requests/otp-requests.service';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { SetMpinInput, VerifyMpinInput } from './dto/set-mpin.input';
import * as bcrypt from 'bcrypt';
import { TOKEN_TIME } from 'src/commons/constant';
import { config } from 'src/commons/config';
import { JwtService } from '@nestjs/jwt';
import { ChangeMyMpinInput } from './dto/change-my-mpin.input';

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
    userData.active = true;
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
    await this.userService.update(userData.id, {
      id: userData.id,
      active: true,
    });
    const tokens = await this.createTokens(userData.id, null);

    return { message: 'Mpin verified successfully', user: userData, tokens };
  }

  async refresh(user_id: number) {
    const tokens = await this.createTokens(user_id, config.ACCESS_KEY);
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
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

  async changeMyMpin(userId: number, data: ChangeMyMpinInput) {
    // 1. Validate the old Mpin
    const userData = await this.userService.findOne({
      where: { id: userId, active: true },
      select: { mpin: true },
    });
    if (!userData) {
      throw new NotFoundException('User not found or inactive');
    }
    const isMatchMpin = await bcrypt.compare(data.currentMpin, userData.mpin);

    if (!isMatchMpin) {
      throw new BadRequestException('Old Mpin does not match');
    }

    const isSameAsOldMpin = await bcrypt.compare(data.newMpin, userData.mpin);
    if (isSameAsOldMpin) {
      throw new BadRequestException(
        'New Mpin cannot be the same as the current Mpin',
      );
    }

    // 2. Update user mpin in the database.
    const user = await this.updateUserMpin(userId, data.newMpin);

    // 3. Return the updated user.
    return user;
  }

  async updateUserMpin(userId: number, mpin: string) {
    mpin = await bcrypt.hash(mpin, 6);
    return this.userService.update(userId, {
      id: userId,
      mpin,
    });
  }
}
