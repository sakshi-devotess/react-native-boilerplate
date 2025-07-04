import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CompanyService],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
