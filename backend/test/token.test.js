import supertest from "supertest";
import prismaClient from "../src/application/database.js";
import app from "../src/application/app.js";
import logger from "../src/application/logging.js";

describe("Token API", () => {
  /**
   * TEST FOR /api/v1/auth/token ENDPOINT
   */

  beforeAll(async () => {
    await supertest(app).post("/api/v1/auth/register").send({
      username: "test",
      name: "Test",
      email: "test@email.com",
      password: "password",
      confPassword: "password",
    });
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  });

  it("should success refresh access token", async () => {
    let response = await supertest(app).post("/api/v1/auth/login").send({
      email: "test@email.com",
      password: "password",
    });
    response = await supertest(app)
      .get("/api/v1/auth/token")
      .send({})
      .set("Cookie", response.headers["set-cookie"]);

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Token refreshed");
    expect(response.body.accessToken).toBeDefined();
  });

  it("should failed refresh access token because no refresh token", async () => {
    let response = await supertest(app).get("/api/v1/auth/token").send({});

    logger.info(response.body);

    expect(response.status).toBe(403);
    expect(response.body.code).toBe(403);
    expect(response.body.message).toBe("Refresh token is required.");
    expect(response.body.error).toBe(true);
  });
});
