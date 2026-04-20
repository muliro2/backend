import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateIncidentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Descricao da ocorrencia' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Nome da maquina' })
  machineName: string;

  @IsNotEmpty()
  @IsEnum(['BAIXA', 'MEDIA', 'ALTA'])
  @Field(() => String, { description: 'Severidade da ocorrencia' })
  severity: 'BAIXA' | 'MEDIA' | 'ALTA';

  @IsNotEmpty()
  @IsEnum(['MECANICA', 'ELETRICA', 'SEGURANCA'])
  @Field(() => String, { description: 'Tipo da ocorrencia' })
  typeOfOccurrence: 'MECANICA' | 'ELETRICA' | 'SEGURANCA';
}
