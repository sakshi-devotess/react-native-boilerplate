import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeService } from './company-type.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('CompanyTypeService', () => {
  let service: CompanyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CompanyTypeService],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
