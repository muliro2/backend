import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidentService } from './incident.service';
import { Incident } from './entities/incident.entity';
import { CreateIncidentInput } from './dto/create-incident.input';

@Resolver(() => Incident)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Mutation(() => Incident)
  createIncident(@Args('createIncidentInput') createIncidentInput: CreateIncidentInput) {
    return this.incidentService.create(createIncidentInput);
  }

  @Query(() => [Incident], { name: 'lastIncidents' })
  lastIncidents(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 5 }) limit?: number,
  ) {
    return this.incidentService.findLast(limit);
  }
}
