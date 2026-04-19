import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco de dados...');
  await prisma.serviceOrder.deleteMany();
  await prisma.machine.deleteMany();
  await prisma.department.deleteMany();

  console.log('Criando Departamentos...');
  const deptProducao = await prisma.department.create({
    data: { name: 'Produção' },
  });

  const deptUsinagem = await prisma.department.create({
    data: { name: 'Setor de Usinagem' },
  });

  console.log('Criando Máquinas...');
  const maquina1 = await prisma.machine.create({
    data: {
      name: 'Tear Circular 04',
      identifier: 'TC-004', // Mudei de 'code' para 'identifier'
      departmentId: deptProducao.id,
    },
  });

  const maquina2 = await prisma.machine.create({
    data: {
      name: 'Fresadora CNC',
      identifier: 'FR-102', // Mudei de 'code' para 'identifier'
      departmentId: deptUsinagem.id,
    },
  });

  console.log('Criando Ordens de Serviço...');
  await prisma.serviceOrder.createMany({
    data: [
      {
        reason: 'Correia de transmissão partida',
        type: 'corretiva',
        priority: 'ALTA',
        machineWasStoped: true,
        serviceDescription: 'Trocar a correia dentada e alinhar as polias do motor principal.',
        machineId: maquina1.id,
      },
      {
        reason: 'Lubrificação trimestral',
        type: 'preventiva',
        priority: 'BAIXA',
        machineWasStoped: false,
        serviceDescription: 'Limpeza geral e aplicação de graxa industrial nos rolamentos.',
        machineId: maquina2.id,
      },
      {
        reason: 'Ruído excessivo no eixo Z',
        type: 'planejada',
        priority: 'MEDIA',
        machineWasStoped: true,
        serviceDescription: 'Verificar folga no fuso de esferas e reapertar parafusos de fixação.',
        machineId: maquina2.id,
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