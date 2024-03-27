import { Test, TestingModule } from '@nestjs/testing';
import { AdressecryptoshoyaController } from './adressecryptoshoya.controller';

describe('AdressecryptoshoyaController', () => {
  let controller: AdressecryptoshoyaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressecryptoshoyaController],
    }).compile();

    controller = module.get<AdressecryptoshoyaController>(AdressecryptoshoyaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
