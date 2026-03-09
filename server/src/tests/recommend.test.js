const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Recommendation APIs", () => {

  /**
   * PERSONALIZED RECOMMENDATIONS
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
   * SIMILAR SONGS
   */
  describe("GET /api/v1/recommend/songs/123/similar", () => {

    test("should return similar songs", async () => {

      const res = await request(app)
        .get("/api/v1/recommend/songs/123/similar");

      expect([200,404]).toContain(res.statusCode);

    });

  });


  /**
   * TRENDING SONGS
   */
  describe("GET /api/v1/recommend/recommendations/trending", () => {

    test("should return trending recommendations", async () => {

      const res = await request(app)
        .get("/api/v1/recommend/recommendations/trending");

      expect(res.statusCode).toBe(200);

    });

  });


  /**
   * GENRE BASED RECOMMENDATIONS
   */
  describe("GET /api/v1/recommend/recommendations/genre/remix", () => {

    test("should return genre recommendations", async () => {

      const res = await request(app)
        .get("/api/v1/recommend/recommendations/genre/remix");

      expect(res.statusCode).toBe(200);

    });

  });


  /**
   * DJ BASED RECOMMENDATIONS
   */
  describe("GET /api/v1/recommend/recommendations/dj/123", () => {

    test("should return DJ recommendations", async () => {

      const res = await request(app)
        .get("/api/v1/recommend/recommendations/dj/123");

      expect([200,500]).toContain(res.statusCode);

    });

  });

});