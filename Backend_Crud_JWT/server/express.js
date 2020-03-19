import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import Template from "../template";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(cors());
app.use(helmet());

// Initially get the template and response from server and then 
// one can declare app.use() functions 
// express has changed the way it works from 2.x to 4.x
// the code is running sequentially

app.get("", (req, res) => {
    res.status(200).send(Template());
  });
  
app.use(userRoutes)

app.use(authRoutes)

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});



export default app;
