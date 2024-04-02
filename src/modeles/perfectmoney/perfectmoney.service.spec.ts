import { Test, TestingModule } from '@nestjs/testing';
import { Perfectmoneyservice } from './perfectmoney.service';

describe('PerfectmoneyService', () => {
  let service: Perfectmoneyservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Perfectmoneyservice],
    }).compile();

    service = module.get<Perfectmoneyservice>(Perfectmoneyservice);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
