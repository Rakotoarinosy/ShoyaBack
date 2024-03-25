import { Test, TestingModule } from '@nestjs/testing';
import { SoldeshoyaController } from './soldeshoya.controller';

describe('SoldeshoyaController', () => {
  let controller: SoldeshoyaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldeshoyaController],
    }).compile();

    controller = module.get<SoldeshoyaController>(SoldeshoyaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
