import { Test, TestingModule } from '@nestjs/testing';
import { OtpRequestsService } from './otp-requests.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('OtpRequestsService', () => {
  let service: OtpRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [OtpRequestsService],
    }).compile();

    service = module.get<OtpRequestsService>(OtpRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
