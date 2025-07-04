import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: {
      getRepository: jest.fn().mockReturnValue({
        extend: jest.fn(),
      }),
    },
  };
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [],
      providers: [],
      exports: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
