import { Test, TestingModule } from '@nestjs/testing';
import { ParcelResolver } from './parcel.resolver';
import { ParcelService } from './parcel.service';

describe('ParcelResolver', () => {
  let resolver: ParcelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelResolver, ParcelService],
    }).compile();

    resolver = module.get<ParcelResolver>(ParcelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
