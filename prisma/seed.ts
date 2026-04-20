import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco de dados...');
  await prisma.serviceOrder.deleteMany();
  await prisma.machine.deleteMany();
  await prisma.department.deleteMany();

  console.log('Criando Departamentos...');
  const deptPreparacao = await prisma.department.create({
    data: { name: 'Preparação de Massa' },
  });

  const deptMoldagem = await prisma.department.create({
    data: { name: 'Moldagem e Extrusão' },
  });

  const deptQueima = await prisma.department.create({
    data: { name: 'Secagem e Queima' },
  });

  console.log('Criando Máquinas Industriais...');
  
  const maquina1 = await prisma.machine.create({
    data: {
      code: 'MB-01-VACCUM',
      name: 'Maromba a Vácuo',
      identifier: 'MB-001',
      description: 'Extrusora responsável pela compactação e moldagem da argila.',
      functionality: 'Moldagem de tijolos e blocos cerâmicos',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
      departmentId: deptMoldagem.id,
    },
  });

  const maquina2 = await prisma.machine.create({
    data: {
      code: 'MST-02-B',
      name: 'Misturador de Eixo Duplo',
      identifier: 'MST-002',
      description: 'Equipamento para homogeneização da argila com água.',
      functionality: 'Mistura e umidificação da matéria-prima',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
      departmentId: deptPreparacao.id,
    },
  });

  const maquina3 = await prisma.machine.create({
    data: {
      code: 'DS-05-R',
      name: 'Desintegrador de Rolo',
      identifier: 'DS-005',
      description: 'Quebra de torrões brutos de argila vindos do pátio.',
      functionality: 'Fragmentação primária da argila',
      imageUrl: 'https://images.unsplash.com/photo-1574689049868-e94ed5301745',
      departmentId: deptPreparacao.id,
    },
  });

  const maquina4 = await prisma.machine.create({
    data: {
      code: 'VNT-F1-01',
      name: 'Exaustor do Forno Hoffman',
      identifier: 'VNT-001',
      description: 'Ventilador de alta potência para circulação de ar quente.',
      functionality: 'Controle de temperatura e tiragem do forno',
      imageUrl: 'https://images.unsplash.com/photo-1565034946487-077786996e27',
      departmentId: deptQueima.id,
    },
  });

  const maquina5 = await prisma.machine.create({
    data: {
      code: 'CRT-A-10',
      name: 'Cortador Eletrônico de Fios',
      identifier: 'CRT-010',
      description: 'Sistema de fios de aço para corte preciso dos blocos na saída da maromba.',
      functionality: 'Dimensionamento final dos produtos cerâmicos',
      imageUrl: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4',
      departmentId: deptMoldagem.id,
    },
  });

  console.log('Criando Ordens de Serviço...');
  await prisma.serviceOrder.createMany({
    data: [
      {
        reason: 'Ruptura de fio de corte',
        type: 'corretiva',
        priority: 'ALTA',
        machineWasStoped: true,
        serviceDescription: 'Substituição do fio de aço trefilado e recalibração do sensor de presença.',
        machineId: maquina5.id,
        createdAt: new Date().toISOString(),
      },
      {
        reason: 'Vazamento de vácuo na câmara',
        type: 'corretiva',
        priority: 'ALTA',
        machineWasStoped: true,
        serviceDescription: 'Troca da gaxeta de vedação da porta de inspeção da maromba.',
        machineId: maquina1.id,
        createdAt: new Date().toISOString(),
      },
      {
        reason: 'Manutenção Preventiva Semestral',
        type: 'preventiva',
        priority: 'MEDIA',
        machineWasStoped: false,
        serviceDescription: 'Lubrificação das engrenagens do misturador e verificação de desgaste das facas.',
        machineId: maquina2.id,
        createdAt: new Date().toISOString(),
      }
    ],
  });

  console.log('Banco populado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });