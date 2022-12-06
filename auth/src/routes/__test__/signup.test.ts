import request from "supertest";
import { app } from "../../app";

it("returns a 201 successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "sdfdf", password: "sdfsdff" })
    .expect(400);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com" })
    .expect(400);
});

it("returns a duplicate email error", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signUp", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
