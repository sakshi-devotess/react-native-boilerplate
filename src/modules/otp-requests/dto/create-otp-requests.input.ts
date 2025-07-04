import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateOtpRequestsInput {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  @MaxLength(6)
  otp_code: string | null;

  @ApiPropertyOptional({
    default: false,
  })
  is_used?: boolean | null;
}
