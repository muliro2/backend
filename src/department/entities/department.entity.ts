import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}
