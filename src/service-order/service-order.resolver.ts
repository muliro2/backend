import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrder } from './entities/service-order.entity';
import { CreateServiceOrderInput } from './dto/create-service-order.input';
import { UpdateServiceOrderInput } from './dto/update-service-order.input';
import { CompleteServiceOrderInput } from './dto/complete-service-order.input';
import { FindAllServiceOrdersInput } from './dto/find-all-service-orders-input';
import { Machine } from '../machine/entities/machine.entity';

@Resolver(() => ServiceOrder)
export class ServiceOrderResolver {
	constructor(private readonly serviceOrderService: ServiceOrderService) {}

	@Mutation(() => ServiceOrder)
	createServiceOrder(
		@Args('createServiceOrderInput') createServiceOrderInput: CreateServiceOrderInput,
	) {
		return this.serviceOrderService.create(createServiceOrderInput);
	}

	@Query(() => [ServiceOrder], { name: 'serviceOrders' })
	findAll(
		@Args('filter', { nullable: true }) filter?: FindAllServiceOrdersInput,
	) {
		return this.serviceOrderService.findAll(filter);
	}

	@Query(() => ServiceOrder, { name: 'serviceOrder' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.serviceOrderService.findOne(id);
	}

	@Mutation(() => ServiceOrder)
	updateServiceOrder(
		@Args('updateServiceOrderInput') updateServiceOrderInput: UpdateServiceOrderInput,
	) {
		return this.serviceOrderService.update(updateServiceOrderInput);
	}

	@Mutation(() => ServiceOrder)
	completeServiceOrder(
		@Args('completeServiceOrderInput') completeServiceOrderInput: CompleteServiceOrderInput,
	) {
		return this.serviceOrderService.complete(completeServiceOrderInput);
	}

	@Mutation(() => ServiceOrder)
	removeServiceOrder(@Args('id', { type: () => String }) id: string) {
		return this.serviceOrderService.remove(id);
	}

	@ResolveField(() => Machine)
	machine(@Parent() serviceOrder: ServiceOrder) {
		return serviceOrder.machine;
	}
}