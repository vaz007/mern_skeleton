import app from "./express";
import mongoose from "mongoose";

import config from "./../config/config";

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to MongoDb : ${mongoUri}`);
});
app.listen(config.port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Server started on Port : ", config.port);
});
