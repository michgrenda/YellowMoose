import express from "express";
import { graphqlHTTP } from "express-graphql";
import chalkColors from "./config/chalk/variables";
import connectDB from "./config/db";
import { schema } from "./graphql/API/Schema";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";

// Connect database
connectDB();

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 1000000 * 5, maxFiles: 10 }),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(chalkColors.success(`Server started on port ${PORT}`));
});
