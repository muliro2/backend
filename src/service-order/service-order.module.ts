// src/service-order/service-order.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderResolver } from './service-order.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ServiceOrderService, ServiceOrderResolver],
  exports: [ServiceOrderService], // Opcional, mas boa prática
})
export class ServiceOrderModule {}