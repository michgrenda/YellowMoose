import express, { Express } from "express";
import chalkColors from "./config/chalk/variables";
import connectDB from "./config/db";

// Connect database
connectDB();

const app: Express = express();

const PORT: string | number = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(chalkColors.success(`Server started on port ${PORT}`));
});
