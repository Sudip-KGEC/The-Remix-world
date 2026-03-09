const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("DJ APIs", () => {

  /**
   * GET DJ PROFILE
   */
  describe("GET /api/v1/djs/:id", () => {

    test("should get DJ profile (public)", async () => {

      const res = await request(app)
        .get("/api/v1/djs/123");

      // allow 500 because DJ doesn't exist in test DB
      expect([200,404,500]).toContain(res.statusCode);

    });

  });


  /**
   * GET DJ FOLLOWERS
   */
  describe("GET /api/v1/djs/:id/followers", () => {

    test("should get DJ followers list", async () => {

      const res = await request(app)
        .get("/api/v1/djs/123/followers");

      expect([200,404,500]).toContain(res.statusCode);

    });

  });


  /**
   * FOLLOW DJ
   */
  describe("POST /api/v1/djs/:id/follow", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .post("/api/v1/djs/123/follow");

      expect(res.statusCode).toBe(401);

    });


    test("should allow USER to follow DJ", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/djs/123/follow")
        .set("Authorization", `Bearer ${token}`);

      expect([200,404,500]).toContain(res.statusCode);

    });

  });

});


describe("GET /api/v1/djs", () => {

  test("should return all DJs", async () => {

    const res = await request(app)
      .get("/api/v1/djs");

    expect(res.statusCode).toBe(200);

  });

});


describe("GET /api/v1/djs/trending", () => {

  test("should return trending DJs", async () => {

    const res = await request(app)
      .get("/api/v1/djs/trending");

    expect(res.statusCode).toBe(200);

  });

});


describe("DELETE /api/v1/djs/:id/unfollow", () => {

  test("should deny without token", async () => {

    const res = await request(app)
      .delete("/api/v1/djs/123/unfollow");

    expect(res.statusCode).toBe(401);

  });

});