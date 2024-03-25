import { Test, TestingModule } from '@nestjs/testing';
import { SoldeuserService } from './soldeuser.service';

describe('SoldeuserService', () => {
  let service: SoldeuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldeuserService],
    }).compile();

    service = module.get<SoldeuserService>(SoldeuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
