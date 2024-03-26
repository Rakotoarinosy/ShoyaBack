import { Test, TestingModule } from '@nestjs/testing';
import { TransactionidService } from './transactionid.service';

describe('TransactionidService', () => {
  let service: TransactionidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionidService],
    }).compile();

    service = module.get<TransactionidService>(TransactionidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
