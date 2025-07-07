import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpInput {
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}
