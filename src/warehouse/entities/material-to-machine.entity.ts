import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MaterialToMachine {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  machineId!: string;

  @Field(() => String, { nullable: true })
  material?: string;
}
