import { Injectable } from '@nestjs/common';
import {
  ParcelCreateInput,
  ParcelUpdateInput,
  ParcelWhereUniqueInput,
  FindManyParcelArgs,
} from '@prisma/client/nestjs-graphql';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class ParcelService {
  constructor(private prisma: PrismaService) {}

  // CRUD

  create(createParcelInput: ParcelCreateInput) {
    return this.prisma.parcel.create({ data: createParcelInput });
  }

  findAll(args: FindManyParcelArgs) {
    return this.prisma.parcel.findMany(args);
  }

  findOne(where: ParcelWhereUniqueInput) {
    return this.prisma.parcel.findUnique({ where });
  }

  update(
    where: ParcelWhereUniqueInput,
    updateParcelInput: ParcelUpdateInput,
  ) {
    return this.prisma.parcel.update({ where, data: updateParcelInput });
  }

  remove(where: ParcelWhereUniqueInput) {
    return this.prisma.parcel.delete({ where });
  }

  // ADMINLAND

  // USERLAND
}
