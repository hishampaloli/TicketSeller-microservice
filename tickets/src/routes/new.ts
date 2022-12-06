import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@hpticketings/common/build";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRoute };
