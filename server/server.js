import express from "express";
import devbundle from "./devBundle";
import path from "path";
import { MongoClient } from "mongodb";

import template from "./../template";

const app = express();
devbundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});


const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});




let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log("Server started on port %s.", port);
});

