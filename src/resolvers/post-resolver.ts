import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";
import { Post } from "../dtos/models/post-model";
import { AllPostsInput } from "../dtos/input/all-post-input";
import axios from "axios";
import { Comment } from "../dtos/models/comment-model";
import { UpdatePost } from "../dtos/input/update-post-input";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async allPosts(@Arg("data") data: AllPostsInput) {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: data?._limit ?? 10,
          _page: data?._page ?? 1,
        },
      },
    );

    return posts;
  }

  @Query(() => Post, { nullable: true })
  async postById(@Arg("id") id: number) {
    const { data: post } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    return post;
  }

  @FieldResolver(() => [Comment!]!)
  async comments(@Root() post: Post) {
    const { data: comments } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
    );
    return comments;
  }

  @Mutation(() => Post)
  async updatePost(@Arg("id") id: number, @Arg("data") data: UpdatePost) {
    const { data: post } = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      data,
    );
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}
