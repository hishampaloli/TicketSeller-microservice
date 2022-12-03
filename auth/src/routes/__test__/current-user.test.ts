import request from "supertest";
import { app } from "../../app";

it("response with details about the user", async () => {
  const cookie = await global.signin();

  const res = await await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("response with null of not auth", async () => {
    
  const res = await request(app)
  .get("/api/users/currentuser")
  .send()
  .expect(200);

expect(res.body.currentUser).toEqual(null);
});
