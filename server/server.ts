import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import chalkColors from "./config/chalk/variables";
import connectDB from "./config/db";
import { schema } from "./graphql/API/Schema";

// Connect database
connectDB();

const app = express();

const PORT: string | number = process.env.PORT || 4000;

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return "Hello world!";
//   },
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(chalkColors.success(`Server started on port ${PORT}`));
});
