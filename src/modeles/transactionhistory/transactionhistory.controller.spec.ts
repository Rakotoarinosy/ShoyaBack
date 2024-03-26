import { Test, TestingModule } from '@nestjs/testing';
import { TransactionhistoryController } from './transactionhistory.controller';

describe('TransactionhistoryController', () => {
  let controller: TransactionhistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionhistoryController],
    }).compile();

    controller = module.get<TransactionhistoryController>(TransactionhistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
