import { Test, TestingModule } from '@nestjs/testing';
import { AdresseusdtService } from './adresseusdt.service';

describe('AdresseusdtService', () => {
  let service: AdresseusdtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdresseusdtService],
    }).compile();

    service = module.get<AdresseusdtService>(AdresseusdtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
