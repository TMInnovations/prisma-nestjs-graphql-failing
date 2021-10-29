import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Customer,
  Delivery,
  FindManyParcelArgs,
  Parcel,
  ParcelCreateInput,
  ParcelUpdateInput,
  ParcelWhereUniqueInput,
} from '@prisma/client/nestjs-graphql';
import { ParcelService } from './parcel.service';

@Resolver(() => Parcel)
export class ParcelResolver {
  constructor(private readonly parcelService: ParcelService) {}

  // FIELDRESOLVER

  @ResolveField(() => Delivery, { name: 'delivery', nullable: true })
  Delivery(@Parent() parcel: Parcel) {
    return this.parcelService.findOne({ id: parcel.id }).delivery();
  }

  @ResolveField(() => Customer, { name: 'customer', nullable: true })
  Customer(@Parent() parcel: Parcel) {
    return this.parcelService.findOne({ id: parcel.id }).customer();
  }

  // CRUD

  @Mutation(() => Parcel)
  createParcel(
    @Args('createParcelInput') createParcelInput: ParcelCreateInput,
  ) {
    return this.parcelService.create(createParcelInput);
  }

  @Query(() => [Parcel], { name: 'parcels' })
  findAll(@Args() args: FindManyParcelArgs) {
    return this.parcelService.findAll(args);
  }

  @Query(() => Parcel, { name: 'parcel' })
  findOne(@Args('where') where: ParcelWhereUniqueInput) {
    return this.parcelService.findOne(where);
  }

  @Mutation(() => Parcel)
  updateParcel(
    @Args('where') where: ParcelWhereUniqueInput,
    @Args('updateParcelInput') updateParcelInput: ParcelUpdateInput,
  ) {
    return this.parcelService.update(where, updateParcelInput);
  }

  @Mutation(() => Parcel)
  removeParcel(@Args('where') where: ParcelWhereUniqueInput) {
    return this.parcelService.remove(where);
  }

  // ADMINLAND

  // USERLAND
}
