import { Test, TestingModule } from '@nestjs/testing';
import { PerfectmoneyService } from './perfectmoney.service';

describe('PerfectmoneyService', () => {
  let service: PerfectmoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfectmoneyService],
    }).compile();

    service = module.get<PerfectmoneyService>(PerfectmoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
