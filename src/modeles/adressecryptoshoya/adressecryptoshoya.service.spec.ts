import { Test, TestingModule } from '@nestjs/testing';
import { AdressecryptoshoyaService } from './adressecryptoshoya.service';

describe('AdressecryptoshoyaService', () => {
  let service: AdressecryptoshoyaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdressecryptoshoyaService],
    }).compile();

    service = module.get<AdressecryptoshoyaService>(AdressecryptoshoyaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
