import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilita a validação global (importante para os DTOs que criamos)
  app.useGlobalPipes(new ValidationPipe());

  // 2. Configura o CORS para o seu frontend (Russas style: deixa passar tudo em dev)
  app.enableCors({
    //['http://localhost:3001', 'http://localhost:3000'], // Permite apenas os domínios do frontend
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 3. Define a porta (geralmente 3000 ou 3001)
  await app.listen(3000);
  console.log(`🚀 Backend rodando em: http://localhost:3000/graphql`);
}
bootstrap();