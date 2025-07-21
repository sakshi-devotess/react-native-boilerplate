import { Controller, Post, Body } from '@nestjs/common';
import { OtpRequestsService } from './otp-requests.service';
import { CreateOtpRequestsInput } from './dto/create-otp-requests.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('otp_requests ')
@ApiBasicAuth()
@Controller('otp_requests ')
export class OtpRequestsController {
  /**
   * Constructor to inject the OtpRequestsService.
   *
   * @param OtpRequestsService - Service to handle the business logic.
   */
  constructor(private readonly otpRequestsService: OtpRequestsService) {}

  /**
   * Creates a new OtpRequests entry.
   *
   * @param {CreateOtpRequestsInput} createOtpRequestsInput - The input data for creating the entity.
   * @returns {Promise<any>} - The newly created entity.
   */
  @ApiBody({ type: CreateOtpRequestsInput })
  @Post()
  create(@Body() createOtpRequestsInput: CreateOtpRequestsInput) {
    return this.otpRequestsService.create(createOtpRequestsInput);
  }
}
