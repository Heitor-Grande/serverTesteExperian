import { Test, TestingModule } from '@nestjs/testing';
import { VisaoGeralController } from './visao-geral.controller';

describe('VisaoGeralController', () => {
  let controller: VisaoGeralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaoGeralController],
    }).compile();

    controller = module.get<VisaoGeralController>(VisaoGeralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
