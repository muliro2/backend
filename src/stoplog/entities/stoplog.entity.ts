import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Stoplog {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  machineId!: string;

  @Field(() => String)
  reason!: string;

  @Field(() => String)
  date!: string;
}
