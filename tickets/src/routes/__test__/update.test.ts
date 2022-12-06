import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId()._id;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "updated",
      price: 243,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId()._id;

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "updated",
      price: 243,
    })
    .expect(401);
});

it("returns a 401 if the user does not not own the ticket ", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "sdfsfd", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "sd",
      price: 3,
    })
    .expect(401);
});

it("returns a 400 if the user provide invalid title or price", async () => {
  const cooki = global.signin();

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cooki)
    .send({ title: "sdfsfd", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cooki)
    .send({
      title: "",
      price: -3,
    })
    .expect(400);
});

it("update the ticket if valid inputs are provided", async () => {
  const cooki = global.signin();

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cooki)
    .send({ title: "sdfsfd", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cooki)
    .send({
      title: "adfdf",
      price: 3,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("adfdf");
  expect(ticketResponse.body.price).toEqual(3);
});
