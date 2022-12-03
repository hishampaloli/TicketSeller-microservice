import request from "supertest";
import { idText } from "typescript";
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
