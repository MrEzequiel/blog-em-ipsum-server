import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import path from "node:path";
import { PostResolver } from "./resolvers/post-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PostResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"), // If this is argumment is not passed, then the file will be create in memory
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`🖥️  Server is running on ${url}`);
}

bootstrap();
