import { Publisher, OrderCancelledEvent, Subject } from "@hpticketings/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subject.OrderCancelled = Subject.OrderCancelled;
}
