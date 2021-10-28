import { Module } from '@nestjs/common';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { HistoryResolver } from './history.resolver';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryResolver, HistoryService],
  imports: [PrismaModule],
})
export class HistoryModule {}
