import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Incident {
  @Field(() => String, { description: 'ID do incidente' })
  id: string;

  @Field(() => String, { description: 'Descricao da ocorrencia' })
  description: string;

  @Field(() => String, { description: 'Nome da maquina' })
  machineName: string;

  @Field(() => String, { description: 'Severidade da ocorrencia' })
  severity: string;

  @Field(() => Date, { description: 'Data de criacao do incidente' })
  createdAt: Date;

  @Field(() => String, { description: 'Status do incidente' })
  status: string;

  @Field(() => String, { description: 'Tipo da ocorrencia' })
  typeOfOccurrence: string;
}
