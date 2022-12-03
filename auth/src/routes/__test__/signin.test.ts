import request from "supertest";
import { app } from "../../app";

it("email does not exists", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("invalid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "passsdfword" })
    .expect(400);
});


it("response with a cookie when give an cookie", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "password" })
      .expect(200);
  
  const res = await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "password" })
      .expect(200);

      expect(res.get('Set-Cookie')).toBeDefined()
  });
  