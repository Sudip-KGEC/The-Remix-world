const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("User APIs", () => {

  /**
   * GET /api/v1/users/me
   */
  describe("GET /api/v1/user/me", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/user/me");

      expect(res.statusCode).toBe(401);

    });

    test("should allow authenticated user", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/user/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });


  /**
   * GET /api/v1/users/credits
   */
  describe("GET /api/v1/user/credits", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/user/credits");

      expect(res.statusCode).toBe(401);

    });

    test("should return user credits", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/user/credits")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });

});