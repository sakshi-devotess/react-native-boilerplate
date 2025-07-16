import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Match } from 'src/commons/decorator/match-validator.decorator';

export class SetMpinInput {
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Mpin must be 6 digit' })
  @Matches(/^\d{6}$/, { message: 'Mpin must be a 6-digit number' })
  mpin: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('mpin', { message: 'Confirm MPIN must match MPIN' })
  confirmMpin: string;
}

export class VerifyMpinInput {
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Mpin must be 6 digit' })
  @Matches(/^\d{6}$/, { message: 'Mpin must be a 6-digit number' })
  mpin: string;
}
