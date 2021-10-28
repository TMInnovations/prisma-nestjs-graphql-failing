import { Module } from '@nestjs/common';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [HistoryModule],
  exports: [HistoryModule],
})
export class ModelsModule {}
