import { ApolloServer } from "@apollo/server";
import { resolvers } from "./Resolvers";
import { typeDefs } from "./Schema";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});