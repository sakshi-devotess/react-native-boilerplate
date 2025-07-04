import { OtpRequests } from '../entities/otp-requests.entity';
import { dataSource } from '../../../core/data-source';

export const otpRequestsRepository = dataSource.getRepository(OtpRequests);
