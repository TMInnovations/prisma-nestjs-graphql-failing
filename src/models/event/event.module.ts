import { Module } from '@nestjs/common';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [PrismaModule],
  providers: [EventResolver, EventService],
})
export class EventModule {}
