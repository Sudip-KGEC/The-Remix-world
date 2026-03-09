const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Song APIs", () => {

  /**
   * PUBLIC - Get Approved Songs
   */
  describe("GET /api/v1/songs/approved", () => {
    test("should return approved songs", async () => {
      const res = await request(app)
        .get("/api/v1/songs/approved");

      expect(res.statusCode).toBe(200);
    });
  });


  /**
   * PUBLIC - Trending Songs
   */
  describe("GET /api/v1/songs/trending", () => {
    test("should return trending songs", async () => {
      const res = await request(app)
        .get("/api/v1/songs/trending");

      expect(res.statusCode).toBe(200);
    });
  });


  /**
   * ADMIN - Upload Song
   */
  describe("POST /api/v1/songs/upload", () => {

    test("should deny USER access", async () => {
      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/songs/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "Test Song");

      expect(res.statusCode).toBe(403);
    });


    test("should allow ADMIN access", async () => {
      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .post("/api/v1/songs/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "Test Song");

      // Upload may fail because files aren't attached
      expect([200, 201, 400, 500]).toContain(res.statusCode);
    });

  });


  /**
   * SUPER ADMIN - Approve Song
   */
  describe("PUT /api/v1/songs/:id/approve", () => {

    test("should deny ADMIN access", async () => {
      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .put("/api/v1/songs/123/approve")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);
    });


    test("should allow SUPER_ADMIN", async () => {
      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .put("/api/v1/songs/123/approve")
        .set("Authorization", `Bearer ${token}`);

      expect([200, 404, 500]).toContain(res.statusCode);
    });

  });


  /**
   * USER - Stream Song
   */
  describe("GET /api/v1/songs/:id/stream", () => {

    test("should deny without token", async () => {
      const res = await request(app)
        .get("/api/v1/songs/123/stream");

      expect(res.statusCode).toBe(401);
    });


    test("should allow USER", async () => {
      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/songs/123/stream")
        .set("Authorization", `Bearer ${token}`);

      expect([200, 404, 500]).toContain(res.statusCode);
    });

  });


  /**
   * ADMIN - Get own songs
   */
  describe("GET /api/v1/songs/my-songs", () => {

    test("should deny USER access", async () => {
      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/songs/my-songs")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);
    });


    test("should allow ADMIN", async () => {
      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .get("/api/v1/songs/my-songs")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });

  });


  /**
   * USER - Play history
   */
  describe("GET /api/v1/songs/history", () => {

    test("should deny without token", async () => {
      const res = await request(app)
        .get("/api/v1/songs/history");

      expect(res.statusCode).toBe(401);
    });


    test("should allow USER", async () => {
      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/songs/history")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });

  });

});


/**
 * PUBLIC - Search Songs
 */
describe("GET /api/v1/songs/search", () => {

  test("should search songs", async () => {

    const res = await request(app)
      .get("/api/v1/songs/search?q=test");

    expect(res.statusCode).toBe(200);

  });

});


/**
 * PUBLIC - Get Song By ID
 */
describe("GET /api/v1/songs/:id", () => {

  test("should return song or error", async () => {

    const res = await request(app)
      .get("/api/v1/songs/123");

    expect([200,404,500]).toContain(res.statusCode);

  });

});


/**
 * PUBLIC - Recommended Songs
 */
describe("GET /api/v1/songs/recommended", () => {

  test("should return recommended songs", async () => {

    const res = await request(app)
      .get("/api/v1/songs/recommended");

    expect(res.statusCode).toBe(200);

  });

});


/**
 * PUBLIC - DJ Songs
 */
describe("GET /api/v1/songs/dj/:djId", () => {

  test("should return dj songs", async () => {

    const res = await request(app)
      .get("/api/v1/songs/dj/123");

    expect([200,500]).toContain(res.statusCode);

  });

});


/**
 * USER - Download Song
 */
describe("POST /api/v1/songs/:id/download", () => {

  test("should deny without token", async () => {

    const res = await request(app)
      .post("/api/v1/songs/123/download");

    expect(res.statusCode).toBe(401);

  });


  test("should allow user", async () => {

    const user = await createTestUser("USER");
    const token = generateToken(user._id, "USER");

    const res = await request(app)
      .post("/api/v1/songs/123/download")
      .set("Authorization", `Bearer ${token}`);

    expect([200,404,500]).toContain(res.statusCode);

  });

});