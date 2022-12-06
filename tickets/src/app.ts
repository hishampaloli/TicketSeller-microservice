import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRoute } from "./routes/new";

import { errorHandler } from "@hpticketings/common/build";
import { NotFoundError, currentUser } from "@hpticketings/common/build";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);


app.use(currentUser);
app.use(createTicketRoute);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
