import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class RequestOtpInput {
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Matches(/^[0-9]{10}$/, { message: 'Mobile number must contain only digits' })
  mobile: string;
}
