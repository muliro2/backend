import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MachineModule } from './machine/machine.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Esta configuração gera o arquivo schema.gql automaticamente 
      // na raiz da pasta src sempre que você salva o código
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Ativa a interface para testar queries no browser
    }),
    PrismaModule,
    MachineModule,
    ServiceOrderModule,
    // Adicione os outros módulos da sua imagem aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

