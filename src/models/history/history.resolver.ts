import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Event,
  FindManyHistoryArgs,
  History,
  HistoryCreateInput,
  HistoryUncheckedUpdateInput,
  HistoryWhereUniqueInput,
} from '@prisma/client/nestjs-graphql';
import { HistoryService } from './history.service';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  // FIELDRESOLVERS

  @ResolveField(() => Event, { name: 'created' })
  Created(@Parent() history: History) {
    return this.historyService.findOne({ id: history.id }).created();
  }

  // CRUD

  @Mutation(() => History)
  createHistory(
    @Args('createHistoryInput') createHistoryInput: HistoryCreateInput,
  ) {
    return this.historyService.create(createHistoryInput);
  }

  @Query(() => [History], { name: 'histories' })
  findAll(@Args() args: FindManyHistoryArgs) {
    return this.historyService.findAll(args);
  }

  @Query(() => History, { name: 'history' })
  findOne(
    @Args('where', { type: () => HistoryWhereUniqueInput })
    where: HistoryWhereUniqueInput,
  ) {
    return this.historyService.findOne(where);
  }

  @Mutation(() => History)
  updateHistory(
    @Args('updateHistoryInput') updateHistoryInput: HistoryUncheckedUpdateInput,
  ) {
    return this.historyService.update(
      updateHistoryInput.id.set,
      updateHistoryInput,
    );
  }

  @Mutation(() => History)
  removeHistory(@Args('id', { type: () => String }) id: string) {
    return this.historyService.remove(id);
  }
}
