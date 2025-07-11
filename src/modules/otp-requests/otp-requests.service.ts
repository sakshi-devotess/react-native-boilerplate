import { Injectable } from '@nestjs/common';
import { otpRequestsRepository } from './repository/otp-requests.repository';
import { OtpRequests } from './entities/otp-requests.entity';
import { RemoveDto } from '../../commons/dto/remove.dto';
import { CreateOtpRequestsInput } from './dto/create-otp-requests.input';
import { UpdateOtpRequestsInput } from './dto/update-otp-requests.input';
import { AbstractService } from 'src/commons/abstract.service';

@Injectable()
export class OtpRequestsService extends AbstractService {
  /**
   * Constructor for OtpRequestsService.
   * Injects dependencies and initializes the abstract service with the otpRequests repository.
   *
   * @param {ResponseMsgService} responseMsgService - Service to handle response messages.
   */
  constructor() {
    super(otpRequestsRepository);
  }

  /**
   * Creates a new OtpRequests entry in the database.
   *
   * This function takes input data for creating a new OtpRequests entity and optionally includes related entities in the response.
   * It returns a Promise that resolves to the created OtpRequests entity or false if the operation fails.
   *
   * @param {CreateOtpRequestsInput} data - Input data for creating the OtpRequests.
   * @param {string[]} [relations=null] - Optional array of related entities to include in the response.
   * @returns {Promise<OtpRequests | boolean>} - The created entity or false if the operation fails.
   */
  async create(data: CreateOtpRequestsInput): Promise<OtpRequests | boolean> {
    const create = await this.abstractCreate(data);
    return create;
  }

  async update(
    id: number,
    data: UpdateOtpRequestsInput,
  ): Promise<OtpRequests | boolean> {
    const update = this.abstractUpdate(id, data);
    return update;
  }
}
