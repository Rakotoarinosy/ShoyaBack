import { Test, TestingModule } from '@nestjs/testing';
import { AdressenetworkService } from './adressenetwork.service';

describe('AdressenetworkService', () => {
  let service: AdressenetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdressenetworkService],
    }).compile();

    service = module.get<AdressenetworkService>(AdressenetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
