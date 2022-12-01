import express from "express";
import { json } from "body-parser";
import colors from "colors";
import "express-async-errors";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-errors";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("DATABSAE CONNECTED");
    
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log(`786 - AUTH SERVER AT 3000`);
  });
};

start();
