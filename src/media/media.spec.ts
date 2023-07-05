import { Test, TestingModule } from '@nestjs/testing';
import { Media } from './media';

describe('Media', () => {
  let provider: Media;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Media],
    }).compile();

    provider = module.get<Media>(Media);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
