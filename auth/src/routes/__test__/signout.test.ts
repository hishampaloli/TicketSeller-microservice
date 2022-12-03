import request from "supertest";
import { app } from "../../app";

it("sign out request", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
});
