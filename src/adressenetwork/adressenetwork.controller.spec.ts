import { Test, TestingModule } from '@nestjs/testing';
import { AdressenetworkController } from './adressenetwork.controller';

describe('AdressenetworkController', () => {
  let controller: AdressenetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressenetworkController],
    }).compile();

    controller = module.get<AdressenetworkController>(AdressenetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
