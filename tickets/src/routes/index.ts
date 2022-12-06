import express, { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from "@hpticketings/common/build";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})

    res.send(tickets)
})


export {router as indexTicketRouter}