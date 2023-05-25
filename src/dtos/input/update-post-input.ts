import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePost {
  @Field()
  title: string;

  @Field()
  body: string;
}
