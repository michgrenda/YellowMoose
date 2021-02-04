import { resolvers as resolversApartment } from "./apartments/resolvers";
import { typeDefs as typeDefsApartment } from "./apartments/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
const { GraphQLUpload } = require("graphql-upload");

export const schema = makeExecutableSchema({
  typeDefs: [typeDefsApartment, `scalar Upload`],
  resolvers: [resolversApartment, { Upload: GraphQLUpload }],
});
