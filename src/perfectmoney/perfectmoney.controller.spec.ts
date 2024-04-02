import { Test, TestingModule } from '@nestjs/testing';
import { PerfectmoneyController } from './perfectmoney.controller';

describe('PerfectmoneyController', () => {
  let controller: PerfectmoneyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfectmoneyController],
    }).compile();

    controller = module.get<PerfectmoneyController>(PerfectmoneyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
