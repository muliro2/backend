import { Module } from '@nestjs/common';
import { IncidentResolver } from './incident.resolver';
import { IncidentService } from './incident.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [IncidentResolver, IncidentService, PrismaService],
})
export class IncidentModule {}
