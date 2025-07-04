import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHasUserService } from './company-has-user.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('CompanyHasUserService', () => {
  let service: CompanyHasUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CompanyHasUserService],
    }).compile();

    service = module.get<CompanyHasUserService>(CompanyHasUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
