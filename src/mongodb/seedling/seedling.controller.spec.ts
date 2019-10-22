import { Test, TestingModule } from '@nestjs/testing';
import { SeedlingController } from './seedling.controller';

describe('Seedling Controller', () => {
  let controller: SeedlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedlingController],
    }).compile();

    controller = module.get<SeedlingController>(SeedlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
