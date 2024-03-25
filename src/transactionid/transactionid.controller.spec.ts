import { Test, TestingModule } from '@nestjs/testing';
import { TransactionidController } from './transactionid.controller';

describe('TransactionidController', () => {
  let controller: TransactionidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionidController],
    }).compile();

    controller = module.get<TransactionidController>(TransactionidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
