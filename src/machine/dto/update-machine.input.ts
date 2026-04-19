import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMachineInput } from './create-machine.input';

@InputType()
export class UpdateMachineInput extends PartialType(CreateMachineInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id!: string;
}
