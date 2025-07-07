import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOtpRequestsInput } from './create-otp-requests.input';

export class UpdateOtpRequestsInput extends PartialType(
  CreateOtpRequestsInput,
) {
  @ApiProperty()
  id: number;
}
