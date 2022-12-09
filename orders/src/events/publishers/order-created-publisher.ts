import { Publisher, OrderCreatedEvent, Subject } from "@hpticketings/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
}
