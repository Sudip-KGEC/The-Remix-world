const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Recommendation APIs", () => {

  /**
   * GET PERSONALIZED RECOMMENDATIONS
   */
  describe("GET /api/v1/recommend/recommendations", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/recommend/recommendations");

      expect(res.statusCode).toBe(401);

    });

    test("should allow authenticated user", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/recommend/recommendations")
        .set("Authorization", `Bearer ${token}`);

      expect([200,404]).toContain(res.statusCode);

    });

  });


  /**
   * GET SIMILAR SONGS
   */
  describe("GET /api/v1/recommendations/songs/123/similar", () => {

    test("should return similar songs (public)", async () => {

      const res = await request(app)
        .get("/api/v1/recommendations/songs/123/similar");

      expect([200,404]).toContain(res.statusCode);

    });

  });

});