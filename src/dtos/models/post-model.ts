import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  id: number;
}
