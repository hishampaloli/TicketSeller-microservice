import { response } from "express";
import request from "supertest";
import { app } from "../../app";

it("has a route listening to /api/tickets for post", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const res = await request(app).post("/api/tickets").send({}).expect(401);
});

it("return a status other than 401 if the user is signed in", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(res.status).not.toEqual(401);
});

it("return an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 20,
    })
    .expect(400);
});

it("return an error if an invalid price is provided", async () => {
    await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "sdfdf",
      price: '',
    })
    .expect(400);

    await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "sdfdf",
    })
    .expect(400);
});

it("creates a tickets with valid inputs", async () => {});
