import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Event,
  EventCreateInput,
  EventWhereUniqueInput,
  FindManyEventArgs,
  UpdateOneEventArgs,
} from '@prisma/client/nestjs-graphql';
import { EventService } from './event.service';
@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  // CRUD

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: EventCreateInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll(args: FindManyEventArgs) {
    return this.eventService.findAll(args);
  }

  @Query(() => Event, { name: 'event' })
  findOne(
    @Args('where', { type: () => EventWhereUniqueInput })
    where: EventWhereUniqueInput,
  ) {
    return this.eventService.findOne(where);
  }

  @Mutation(() => Event)
  updateEvent(@Args('args') args: UpdateOneEventArgs) {
    return this.eventService.update(args);
  }

  @Mutation(() => Event)
  removeEvent(
    @Args('where', { type: () => EventWhereUniqueInput })
    where: EventWhereUniqueInput,
  ) {
    return this.eventService.remove(where);
  }
}
