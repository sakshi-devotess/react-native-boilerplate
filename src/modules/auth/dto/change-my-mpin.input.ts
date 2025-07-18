import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from '../../../commons/decorator/match-validator.decorator';
export class ChangeMyMpinInput {
  @ApiProperty()
  @IsNotEmpty()
  currentMpin: string;

  @ApiProperty()
  @IsNotEmpty()
  newMpin: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('newMpin', { message: 'New Mpin and confirm Mpin do not match' })
  @Matches(/^\d{6}$/, { message: 'Mpin must be a 6-digit number' })
  confirmMpin: string;
}
