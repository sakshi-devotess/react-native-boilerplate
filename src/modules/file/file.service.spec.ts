import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [FileService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
