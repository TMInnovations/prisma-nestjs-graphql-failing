import { Injectable } from '@nestjs/common';
import {
  FindManyHistoryArgs,
  HistoryCreateInput,
  HistoryUncheckedUpdateInput,
  HistoryWhereUniqueInput,
} from '@prisma/client/nestjs-graphql';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  create(createHistoryInput: HistoryCreateInput) {
    return this.prisma.history.create({ data: createHistoryInput });
  }

  findAll(args: FindManyHistoryArgs) {
    return this.prisma.history.findMany(args);
  }

  findOne(where: HistoryWhereUniqueInput) {
    return this.prisma.history.findUnique({ where });
  }

  // Not necessary for now
  update(id: string, updateHistoryInput: HistoryUncheckedUpdateInput) {
    return this.prisma.history.update({
      where: { id },
      data: updateHistoryInput,
    });
  }

  // Not necessary for now
  remove(id: string) {
    return this.prisma.history.delete({ where: { id } });
  }
}
