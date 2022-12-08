import { Publisher, Subject, TicketCreatedEvent } from "@hpticketings/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
}


