import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceOrderInput } from './dto/create-service-order.input';
import { UpdateServiceOrderInput } from './dto/update-service-order.input';
import { CompleteServiceOrderInput } from './dto/complete-service-order.input';
import { FindAllServiceOrdersInput } from './dto/find-all-service-orders-input';

const serviceOrderInclude = {
	machine: {
		include: {
			department: true,
		},
	},
} as const;

@Injectable()
export class ServiceOrderService {
	constructor(private readonly prisma: PrismaService) {}

	create(createServiceOrderInput: CreateServiceOrderInput) {
		return this.prisma.serviceOrder.create({
			data: {
				machineId: createServiceOrderInput.machineId,
				reason: createServiceOrderInput.reason,
				type: createServiceOrderInput.type,
				priority: createServiceOrderInput.priority,
				machineWasStoped: createServiceOrderInput.machineWasStoped,
				serviceDescription: createServiceOrderInput.serviceDescription,
				servicePerformed: createServiceOrderInput.servicePerformed,
				serviceInitDate: createServiceOrderInput.serviceInitDate,
				serviceEndDate: createServiceOrderInput.serviceEndDate,
				serviceOrderEndDate: createServiceOrderInput.serviceOrderEndDate,
			},
			include: serviceOrderInclude,
		});
	}

	findAll(filter?: FindAllServiceOrdersInput) {
		return this.prisma.serviceOrder.findMany({
			where: filter?.machineId ? { machineId: filter.machineId } : undefined,
			include: serviceOrderInclude,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	findOne(id: string) {
		return this.prisma.serviceOrder.findUnique({
			where: { id },
			include: serviceOrderInclude,
		});
	}

	update(updateServiceOrderInput: UpdateServiceOrderInput) {
		return this.prisma.serviceOrder.update({
			where: { id: updateServiceOrderInput.id },
			data: {
				machineId: updateServiceOrderInput.machineId,
				reason: updateServiceOrderInput.reason,
				type: updateServiceOrderInput.type,
				priority: updateServiceOrderInput.priority,
				machineWasStoped: updateServiceOrderInput.machineWasStoped,
				serviceDescription: updateServiceOrderInput.serviceDescription,
				servicePerformed: updateServiceOrderInput.servicePerformed,
				serviceInitDate: updateServiceOrderInput.serviceInitDate,
				serviceEndDate: updateServiceOrderInput.serviceEndDate,
				serviceOrderEndDate: updateServiceOrderInput.serviceOrderEndDate,
				serviceOrderLink: updateServiceOrderInput.serviceOrderLink,
			},
			include: serviceOrderInclude,
		});
	}

	async complete(completeServiceOrderInput: CompleteServiceOrderInput) {
    console.log("Recebido no Backend:", completeServiceOrderInput);

    if (!completeServiceOrderInput.serviceEndDate) {
        throw new Error("Data de término não recebida pelo servidor!");
    }

    const endDate = new Date(completeServiceOrderInput.serviceEndDate);

    // Verificação de segurança de CC:
    if (isNaN(endDate.getTime())) {
        console.error("Data inválida convertida:", completeServiceOrderInput.serviceEndDate);
        throw new Error("Formato de data inválido");
    }

    return this.prisma.serviceOrder.update({
        where: { id: completeServiceOrderInput.id },
        data: {
            serviceEndDate: endDate,
            serviceOrderEndDate: endDate,
            serviceOrderLink: completeServiceOrderInput.serviceOrderLink,
        },
    });
}

	remove(id: string) {
		return this.prisma.serviceOrder.delete({
			where: { id },
			include: serviceOrderInclude,
		});
	}
}