import { ApiProperty } from '@nestjs/swagger';
import { CreateOtpRequestsInput } from './create-otp-requests.input';

export class UpdateOtpRequestsInput extends CreateOtpRequestsInput {
  @ApiProperty()
  id: number;
}
