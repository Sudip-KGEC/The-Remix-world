const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");


describe("User APIs", () => {

  describe("GET /api/v1/users/me", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/users/me");

      expect(res.statusCode).toBe(401);

    });

    test("should return profile for authenticated user", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

    });

  });



  describe("GET /api/v1/users/credits", () => {

    test("should return credits", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/credits")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.credits).toBeDefined();

    });

  });



  describe("POST /api/v1/users/follow-dj", () => {

    test("user should follow DJ", async () => {

      const user = await createTestUser("USER");
      const dj = await createTestUser("ADMIN");

      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/users/follow-dj")
        .set("Authorization", `Bearer ${token}`)
        .send({
          djId: dj._id
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

    });

  });



  describe("GET /api/v1/users/following", () => {

    test("should return following DJs", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/following")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  describe("GET /api/v1/users/downloads", () => {

    test("should return downloads", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/downloads")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  describe("GET /api/v1/users/playlists", () => {

    test("should return playlists", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/playlists")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  describe("GET /api/v1/users/history", () => {

    test("should return play history", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/users/history")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });

});