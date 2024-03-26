import { Test, TestingModule } from '@nestjs/testing';
import { SoldeuserController } from './soldeuser.controller';

describe('SoldeuserController', () => {
  let controller: SoldeuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldeuserController],
    }).compile();

    controller = module.get<SoldeuserController>(SoldeuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
