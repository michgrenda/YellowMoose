import mongoose from "mongoose";
import config from "config";
import chalkColors from "./chalk/variables";

const db: string = config.get("mongoURI");

const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(chalkColors.success("MongoDB connected..."));
  } catch (error) {
    console.error(chalkColors.error(error));

    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
