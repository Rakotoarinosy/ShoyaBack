import { Test, TestingModule } from '@nestjs/testing';
import { SoldeshoyaService } from './soldeshoya.service';

describe('SoldeshoyaService', () => {
  let service: SoldeshoyaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldeshoyaService],
    }).compile();

    service = module.get<SoldeshoyaService>(SoldeshoyaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
