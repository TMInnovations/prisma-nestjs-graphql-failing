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
  EventCreateInput,
  EventUpdateInput,
  EventWhereUniqueInput,
  FindManyEventArgs,
  User,
} from '@prisma/client/nestjs-graphql';
import { EventService } from './event.service';
@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @ResolveField(() => User, { name: 'who' })
  Who(@Parent() event: Event) {
    return this.eventService.findOne({ id: event.id }).who();
  }

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
  updateEvent(
    @Args('where', { type: () => EventWhereUniqueInput })
    where: EventWhereUniqueInput,
    @Args('updateEventInput') updateEventInput: EventUpdateInput,
  ) {
    return this.eventService.update(where, updateEventInput);
  }

  @Mutation(() => Event)
  removeEvent(
    @Args('where', { type: () => EventWhereUniqueInput })
    where: EventWhereUniqueInput,
  ) {
    return this.eventService.remove(where);
  }
}
