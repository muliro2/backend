# Backend - Desafio Técnico de Estágio

API backend desenvolvida para um desafio técnico de estágio, com foco em organização de código, uso de Prisma ORM e persistência em MongoDB.

O projeto utiliza **NestJS** como framework principal e expõe uma **API GraphQL** para consumo pelo frontend. A proposta é demonstrar uma estrutura backend limpa, escalável e fácil de evoluir.

## Tecnologias utilizadas

- **Node.js**
- **NestJS**
- **GraphQL** com Apollo Server
- **Prisma ORM**
- **MongoDB**
- **TypeScript**
- **dotenv** para variáveis de ambiente
- **class-validator** e **class-transformer** para validação de dados

## Pré-requisitos

Antes de iniciar, verifique se você possui:

- **Node.js 20+** instalado
- **npm** ou **yarn**
- **MongoDB** local ou uma instância no **MongoDB Atlas**

## Instalação e setup

### 1. Clonar o repositório

```bash
git clone https://github.com/muliro2/backend
```

### 2. Acessar a pasta do backend

```bash
cd backend
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Criar o arquivo de ambiente

Crie um arquivo chamado `.env` na raiz do backend com a URL do MongoDB:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/desafio_acert?retryWrites=true&w=majority"
```

Se estiver usando MongoDB local:

```env
DATABASE_URL="mongodb://localhost:27017/desafio_acert"
```

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Sincronizar o schema com o banco

Como o projeto usa **MongoDB**, o comando recomendado é `db push`:

```bash
npx prisma db push
```

### 7. Rodar o projeto

Modo desenvolvimento:

```bash
npm run start:dev
```

O backend ficará disponível em:

```bash
http://localhost:3000/graphql
```

## Configuração do Prisma

O arquivo [prisma/schema.prisma](prisma/schema.prisma) define:

- o **datasource** apontando para MongoDB;
- o **generator** do Prisma Client;
- os **models** da aplicação, como `Machine`, `ServiceOrder`, `Department` e outros;
- o enum `Priority`, usado nas ordens de serviço.

### Comandos úteis do Prisma

```bash
npx prisma generate
npx prisma db push
```

> **Importante:** em projetos com MongoDB, o Prisma não utiliza migrations da mesma forma que em bancos relacionais. Por isso, o comando correto para aplicar a estrutura ao banco é `db push`.

### Seed do banco

O projeto também possui configuração de seed no Prisma:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Se necessário, execute o seed manualmente com:

```bash
npx prisma db seed
```

## Scripts disponíveis

Os principais scripts definidos em [package.json](package.json) são:

```bash
npm run build       # compila o projeto NestJS
npm run start       # executa em modo produção/local
npm run start:dev    # executa com hot reload
npm run start:debug  # executa com debugger
npm run start:prod   # inicia a versão compilada em dist/
npm run lint        # executa ESLint
npm run format      # aplica formatação com Prettier
npm run test        # executa testes unitários
npm run test:e2e    # executa testes end-to-end
npm run test:cov    # executa cobertura de testes
```

## Estrutura de pastas

Estrutura principal do backend:

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── machine/
│   ├── service-order/
│   ├── department/
│   ├── stoplog/
│   └── warehouse/
└── test/
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

### Organização por domínio

- **machine/**: regras e resolvers relacionadas às máquinas
- **service-order/**: criação, conclusão, edição e remoção de ordens de serviço
- **prisma/**: integração com o banco e serviço compartilhado do Prisma
- **stoplog/** e **warehouse/**: entidades de apoio ao domínio

## Como testar a API

Como esta aplicação expõe **GraphQL**, os testes podem ser feitos pelo **GraphQL Playground** em:

```bash
http://localhost:3000/graphql
```

### Exemplo de query com `curl`

```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"query { serviceOrders { id reason type priority } }\"}"
```

### Exemplo de mutation com `curl`

```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"mutation { createServiceOrder(input: { machineId: \\\"ID_DA_MAQUINA\\\", reason: \\\"Falha no motor\\\", type: \\\"corretiva\\\", priority: \\\"ALTA\\\", machineWasStoped: true, serviceDescription: \\\"Parada imediata para análise\\\" }) { id reason } }\"}"
```

> Os nomes exatos das queries e mutations podem variar conforme os resolvers implementados em [src/service-order](src/service-order) e [src/machine](src/machine).

## Boas práticas aplicadas

- Separação de responsabilidades por módulos de domínio
- Uso de **Prisma ORM** para acesso tipado ao MongoDB
- Configuração via **variáveis de ambiente**
- Validação de entrada com **ValidationPipe**
- Estrutura pronta para evoluir para camadas de controller, service e resolver
- Uso de **GraphQL** para consultas mais flexíveis no frontend

## Possíveis melhorias

Este backend pode ser evoluído com:

- **Autenticação e autorização** com JWT e refresh token
- **Testes automatizados** mais completos para serviços e resolvers
- **Documentação de schema GraphQL** mais detalhada
- **Docker** e `docker-compose` para facilitar setup local
- **Logs estruturados** e observabilidade
- **Paginação, filtros e ordenação** nas principais queries
- **Pipeline de CI/CD** para build, lint e testes

## Observações sobre o projeto

- O backend roda na porta **3000**
- O endpoint GraphQL está disponível em **/graphql**
- O CORS está habilitado para integração com o frontend
- O projeto usa MongoDB, então o fluxo com Prisma é baseado em `generate` + `db push`

## Licença

Projeto criado para fins de estudo e portfólio.
