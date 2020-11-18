import { resolvers as resolversApartment } from "./apartments/resolvers";
import { typeDefs as typeDefsApartment } from "./apartments/types";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: typeDefsApartment,
  resolvers: resolversApartment,
});
