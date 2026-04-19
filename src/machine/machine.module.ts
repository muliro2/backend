import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineResolver } from './machine.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MachineResolver, MachineService, PrismaService],
})
export class MachineModule {}