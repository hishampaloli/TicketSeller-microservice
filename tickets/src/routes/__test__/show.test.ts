import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the ticket is not found", async () => {
  await request(app).get("/api/tickets/sdfdgsfs").send().expect(404);
});

it("return the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = "345";

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
});
