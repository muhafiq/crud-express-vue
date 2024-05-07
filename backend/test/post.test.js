import supertest from "supertest";
import prismaClient from "../src/application/database.js";
import app from "../src/application/app.js";
import logger from "../src/application/logging.js";
import { postFactory } from "./factory.js";

describe("Post API", () => {
  let refreshToken = "";
  let accessToken = "";
  let userId;

  beforeAll(async () => {
    let response = await supertest(app).post("/api/v1/auth/register").send({
      username: "test",
      name: "Test",
      email: "test@email.com",
      password: "password",
      confPassword: "password",
    });

    response = await supertest(app).post("/api/v1/auth/login").send({
      email: "test@email.com",
      password: "password",
    });

    console.log(response.body);
    refreshToken = response.headers["set-cookie"];
    accessToken = response.body.accessToken;
    userId = response.body.data.userId;

    const posts = postFactory(5);
    posts.forEach(async (post) => {
      await prismaClient.post.create({
        data: {
          title: post.title,
          content: post.content,
          authorId: userId,
        },
      });
    });
  });

  afterAll(async () => {
    await prismaClient.post.deleteMany();
    await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  });

  /**
   * TEST FOR /api/v1/post/create ENDPOINT
   */

  describe("POST /api/v1/post/create", () => {
    afterEach(async () => {
      await prismaClient.post.deleteMany({
        where: { title: "Test Post" },
      });
    });

    it("should success create new post", async () => {
      const response = await supertest(app)
        .post("/api/v1/post/create")
        .send({
          title: "Test Post",
          content: "This is a test post",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body.message);

      expect(response.status).toBe(201);
      expect(response.body.code).toBe(201);
      expect(response.body.message).toBe("Post created");
      expect(response.body.data).toHaveProperty("postId");
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("content");
    });

    it("should failed create new post because no title data", async () => {
      const response = await supertest(app)
        .post("/api/v1/post/create")
        .send({
          title: "",
          content: "aaa",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
    });

    it("should failed create new post because don't provide token", async () => {
      const response = await supertest(app).post("/api/v1/post/create").send({
        title: "Test Post",
        content: "",
      });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(true);
    });
  });

  /**
   * TEST FOR /api/v1/post/ ENDPOINT
   */

  describe("GET /api/v1/post/", () => {
    it("should success get all posts", async () => {
      const response = await supertest(app)
        .get("/api/v1/post/all")
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("All posts");
      expect(response.body.data).toHaveLength(5);
    });

    it("should success get user posts", async () => {
      const response = await supertest(app)
        .get(`/api/v1/post/${userId}`)
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      console.log(response.body.message);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("User posts");
      expect(response.body.data).toHaveLength(5);
    });

    it("should failed get user posts because don't provide token", async () => {
      const response = await supertest(app).get(`/api/v1/post/${userId}`);

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(true);
    });

    it("should failed get user posts because user not found", async () => {
      const response = await supertest(app)
        .get(`/api/v1/post/100`)
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("No posts found for this user");
    });

    it("should success search posts", async () => {
      const response = await supertest(app)
        .get(`/api/v1/post/search?q=verbum`)
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("Search posts");
    });
  });

  /**
   * TEST FOR /api/v1/post/edit/:postId ENDPOINT
   */
  describe("PUT /api/v1/post/edit/:postId", () => {
    let postId = "";

    beforeAll(async () => {
      const response = await supertest(app)
        .post("/api/v1/post/create")
        .send({
          title: "Test Post",
          content: "This is a test post",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      console.log(response.body);
      postId = response.body.data.postId;
    });

    afterAll(async () => {
      await prismaClient.post.deleteMany({
        where: { postId: postId },
      });
    });

    it("should success edit the post", async () => {
      const response = await supertest(app)
        .put(`/api/v1/post/edit/${postId}`)
        .send({
          title: "Test Post Updated",
          content: "This is a test post updated",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body.message);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("Post updated");
      expect(response.body.data).toHaveProperty("postId");
    });

    it("should failed edit the post because don't provide token", async () => {
      const response = await supertest(app)
        .put(`/api/v1/post/edit/${postId}`)
        .send({
          title: "Test Post Updated",
          content: "This is a test post updated",
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(true);
    });

    it("should failed edit the post because post not found", async () => {
      const response = await supertest(app)
        .put(`/api/v1/post/edit/100`)
        .send({
          title: "Test Post Updated",
          content: "This is a test post updated",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      console.log(response.body.message);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Post not found");
    });
  });

  /**
   * TEST FOR /api/v1/post/delete/:postId ENDPOINT
   */
  describe("DELETE /api/v1/post/delete/:postId", () => {
    let postId = "";

    beforeAll(async () => {
      const response = await supertest(app)
        .post("/api/v1/post/create")
        .send({
          title: "Test Post",
          content: "This is a test post",
        })
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      console.log(response.body);
      postId = response.body.data.postId;
    });

    afterAll(async () => {
      await prismaClient.post.deleteMany({
        where: { postId: postId },
      });
    });

    it("should success delete post", async () => {
      const response = await supertest(app)
        .delete(`/api/v1/post/delete/${postId}`)
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe("Post deleted");
    });

    it("should failed delete post because don't provide token", async () => {
      const response = await supertest(app).delete(
        `/api/v1/post/delete/${postId}`
      );

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe(true);
    });

    it("should failed delete post because post not found", async () => {
      const response = await supertest(app)
        .delete(`/api/v1/post/delete/100`)
        .set("Cookie", [refreshToken])
        .set("Authorization", `Bearer ${accessToken}`);

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Post not found");
    });
  });
});
