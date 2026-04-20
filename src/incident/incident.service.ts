import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncidentInput } from './dto/create-incident.input';

@Injectable()
export class IncidentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIncidentInput: CreateIncidentInput) {
    return this.prisma.incident.create({
      data: {
        description: createIncidentInput.description,
        machineName: createIncidentInput.machineName,
        severity: createIncidentInput.severity,
        typeOfOccurrence: createIncidentInput.typeOfOccurrence,
      },
    });
  }

  findLast(limit = 5) {
    const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 5;

    return this.prisma.incident.findMany({
      orderBy: { createdAt: 'desc' },
      take: normalizedLimit,
    });
  }
}
