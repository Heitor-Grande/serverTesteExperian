import { Test, TestingModule } from '@nestjs/testing';
import { FazendaController } from './fazenda.controller';

describe('FazendaController', () => {
  let controller: FazendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendaController],
    }).compile();

    controller = module.get<FazendaController>(FazendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
