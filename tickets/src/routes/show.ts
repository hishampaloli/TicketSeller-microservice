import express, { Request, Response } from "express";
import { requireAuth, validateRequest, NotFoundError } from "@hpticketings/common/build";
import { body,param } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id",[param()], async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new NotFoundError()
  }

  res.send(ticket)
});

export { router as showTicketRouter };
