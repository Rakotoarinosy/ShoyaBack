import { Test, TestingModule } from '@nestjs/testing';
import { AdresseusdtController } from './adresseusdt.controller';

describe('AdresseusdtController', () => {
  let controller: AdresseusdtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdresseusdtController],
    }).compile();

    controller = module.get<AdresseusdtController>(AdresseusdtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
