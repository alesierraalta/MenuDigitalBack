import { Test, TestingModule } from '@nestjs/testing';
import { ComidasService } from './comidas.service';

describe('ComidasService', () => {
  let service: ComidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComidasService],
    }).compile();

    service = module.get<ComidasService>(ComidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
