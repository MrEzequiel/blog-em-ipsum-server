import { Field, InputType } from "type-graphql";

@InputType()
export class AllPostsInput {
  @Field({ nullable: true })
  _limit: number;

  @Field({ nullable: true })
  _page: number;
}
