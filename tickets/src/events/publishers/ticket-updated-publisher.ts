import { Publisher, Subject, TicketUpdatedEvent } from "@hpticketings/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subject.TicketUpdated = Subject.TicketUpdated;
}


