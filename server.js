const express = require("express");
const chalkColors = require("./config/chalk/variables");
const connectDB = require("./config/db");

// Connect database
connectDB();

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(chalkColors.success(`Server started on port ${PORT}`));
});
