import { Injectable } from '@nestjs/common';
import {
  EventCreateInput,
  EventUpdateInput,
  EventWhereUniqueInput,
  FindManyEventArgs,
} from '@prisma/client/nestjs-graphql';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(createEventInput: EventCreateInput) {
    return this.prisma.event.create({ data: createEventInput });
  }

  findAll(args: FindManyEventArgs) {
    return this.prisma.event.findMany(args);
  }

  findOne(where: EventWhereUniqueInput) {
    return this.prisma.event.findUnique({ where });
  }

  update(where: EventWhereUniqueInput, updateEventInput: EventUpdateInput) {
    return this.prisma.event.update({ where, data: updateEventInput });
  }

  remove(where: EventWhereUniqueInput) {
    return this.prisma.event.delete({ where });
  }
}
