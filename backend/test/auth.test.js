import supertest from "supertest";
import prismaClient from "../src/application/database.js";
import app from "../src/application/app.js";
import logger from "../src/application/logging.js";

describe("Auth API", () => {
  /**
   * TEST FOR /api/v1/auth/login ENDPOINT
   */

  describe("POST /api/v1/auth/register", () => {
    afterEach(async () => {
      await prismaClient.user.deleteMany({
        where: { username: "test" },
      });
    });

    it("should success create new user", async () => {
      const response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test",
        name: "Test",
        email: "test@email.com",
        password: "password",
        confPassword: "password",
      });

      logger.info(response.body);

      expect(response.status).toBe(201);
      expect(response.body.code).toBe(201);
      expect(response.body.message).toBe("User created");
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).toHaveProperty("email");
    });

    it("should failed create new user because no data", async () => {
      const response = await supertest(app).post("/api/v1/auth/register").send({
        username: "",
        name: "",
        email: "",
        password: "",
        confPassword: "",
      });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
    });

    it("should failed create new user because different password and confPassword", async () => {
      const response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test",
        name: "Test",
        email: "test@email.com",
        password: "password",
        confPassword: "password123",
      });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
    });

    it("should failed create new user because duplicate email", async () => {
      let response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test",
        name: "Test",
        email: "test@email.com",
        password: "password",
        confPassword: "password",
      });

      logger.info(response.body);

      expect(response.status).toBe(201);
      expect(response.body.code).toBe(201);
      expect(response.body.message).toBe("User created");
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).toHaveProperty("email");

      response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test1",
        name: "Test",
        email: "test@email.com",
        password: "password",
        confPassword: "password",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Email already exists");
    });

    it("should failed create new user because duplicate username", async () => {
      let response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test",
        name: "Test",
        email: "test@email.com",
        password: "password",
        confPassword: "password",
      });

      logger.info(response.body);

      expect(response.status).toBe(201);
      expect(response.body.code).toBe(201);
      expect(response.body.message).toBe("User created");
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).toHaveProperty("email");

      response = await supertest(app).post("/api/v1/auth/register").send({
        username: "test",
        name: "Test",
        email: "test1@email.com",
        password: "password",
        confPassword: "password",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Username already exists");
    });
  });

  /**
   * TEST FOR /api/v1/auth/login ENDPOINT
   */
  describe("POST /api/v1/auth/login", () => {
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

    it("should success login", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: "test@email.com",
        password: "password",
      });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("User logged in");
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("data");
    });

    it("should failed login because wrong email", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: "test@mamail.com",
        password: "password",
      });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("User not found");
    });

    it("should failed login because wrong password", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: "test@email.com",
        password: "password123",
      });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Invalid email or password");
    });
  });

  /**
   * TEST FOR /api/v1/auth/logout ENDPOINT
   */

  describe("DELETE /api/v1/auth/logout", () => {
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

    it("should success logout", async () => {
      let response = await supertest(app).post("/api/v1/auth/login").send({
        email: "test@email.com",
        password: "password",
      });

      response = await supertest(app)
        .delete("/api/v1/auth/logout")
        .set("Cookie", response.headers["set-cookie"]);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("User logged out");
    });

    it("should failed logout because not logged in", async () => {
      const response = await supertest(app).delete("/api/v1/auth/logout");

      expect(response.status).toBe(400);
      expect(response.body.code).toBe(400);
      expect(response.body.message).toBe("User not logged in");
    });
  });
});
