import { Test, TestingModule } from '@nestjs/testing';
import { VisaoGeralService } from './visao-geral.service';

describe('VisaoGeralService', () => {
  let service: VisaoGeralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaoGeralService],
    }).compile();

    service = module.get<VisaoGeralService>(VisaoGeralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
