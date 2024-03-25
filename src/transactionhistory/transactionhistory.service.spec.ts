import { Test, TestingModule } from '@nestjs/testing';
import { TransactionhistoryService } from './transactionhistory.service';

describe('TransactionhistoryService', () => {
  let service: TransactionhistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionhistoryService],
    }).compile();

    service = module.get<TransactionhistoryService>(TransactionhistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
