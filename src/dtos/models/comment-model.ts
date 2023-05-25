import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  body: string;
}
