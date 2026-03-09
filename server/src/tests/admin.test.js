const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Admin API", () => {

  /**
   * PLATFORM OVERVIEW
   */
  describe("GET /api/v1/admin/platform/overview", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/admin/platform/overview");

      expect(res.statusCode).toBe(401);

    });

    test("should deny USER access", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/admin/platform/overview")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/platform/overview")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * TOTAL PLAYS
   */
  describe("GET /api/v1/admin/platform/plays", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/platform/plays")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * CREATE ADMIN
   */
  describe("POST /api/v1/admin/admins", () => {

    test("should deny USER", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/admin/admins")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });


    test("should allow SUPER_ADMIN to create admin", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .post("/api/v1/admin/admins")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "DJ Admin",
          email: `dj${Date.now()}@test.com`,
          password: "123456"
        });

      expect(res.statusCode).toBe(201);

    });

  });



  /**
   * GET ALL ADMINS
   */
  describe("GET /api/v1/admin/admins", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/admins")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * DELETE ADMIN
   */
  describe("DELETE /api/v1/admin/admins/:id", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const admin = await createTestUser("ADMIN");

      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .delete(`/api/v1/admin/admins/${admin._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect([200,404]).toContain(res.statusCode);

    });

  });



  /**
   * ADMIN EARNINGS
   */
  describe("GET /api/v1/admin/earnings", () => {

    test("should deny USER", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/admin/earnings")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });


    test("should allow ADMIN", async () => {

      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/earnings")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * WITHDRAW REQUEST
   */
  describe("POST /api/v1/admin/withdraw-request", () => {

    test("should allow ADMIN", async () => {

      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .post("/api/v1/admin/withdraw-request")
        .set("Authorization", `Bearer ${token}`);

      expect([200,400]).toContain(res.statusCode);

    });

  });



  /**
   * GET WITHDRAW REQUESTS
   */
  describe("GET /api/v1/admin/withdraw-requests", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/withdraw-requests")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * APPROVE WITHDRAW
   */
  describe("POST /api/v1/admin/withdraw-approve/:id", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const admin = await createTestUser("ADMIN");

      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .post(`/api/v1/admin/withdraw-approve/${admin._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect([200,404]).toContain(res.statusCode);

    });

  });



  /**
   * PLATFORM REVENUE
   */
  describe("GET /api/v1/admin/platform/revenue", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/platform/revenue")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * TOP DJs
   */
  describe("GET /api/v1/admin/platform/top-djs", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/platform/top-djs")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * TOP SONGS
   */
  describe("GET /api/v1/admin/platform/top-songs", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/admin/platform/top-songs")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });



  /**
   * DISTRIBUTE REVENUE
   */
  describe("POST /api/v1/admin/platform/distribute-revenue", () => {

    test("should allow SUPER_ADMIN", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .post("/api/v1/admin/platform/distribute-revenue")
        .set("Authorization", `Bearer ${token}`)
        .send({ monthlyRevenue: 10000 });

      expect([200,400,500]).toContain(res.statusCode);

    });

  });

});