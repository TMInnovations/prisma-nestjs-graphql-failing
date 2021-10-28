import { Module } from '@nestjs/common';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { ParcelResolver } from './parcel.resolver';
import { ParcelService } from './parcel.service';

@Module({
  imports: [PrismaModule],
  providers: [ParcelResolver, ParcelService],
  exports: [ParcelService],
})
export class ParcelModule {}
