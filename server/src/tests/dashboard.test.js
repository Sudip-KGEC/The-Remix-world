const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Dashboard APIs", () => {

  /**
   * USER DASHBOARD
   */
  describe("GET /api/v1/dashboard/user", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .get("/api/v1/dashboard/user");

      expect(res.statusCode).toBe(401);

    });

    test("should deny ADMIN access", async () => {

      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .get("/api/v1/dashboard/user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });

    test("should allow USER access", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/dashboard/user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });


  /**
   * ADMIN DASHBOARD
   */
  describe("GET /api/v1/dashboard/admin", () => {

    test("should deny USER access", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .get("/api/v1/dashboard/admin")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });

    test("should allow ADMIN access", async () => {

      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .get("/api/v1/dashboard/admin")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });


  /**
   * SUPER ADMIN DASHBOARD
   */
  describe("GET /api/v1/dashboard/super-admin", () => {

    test("should deny ADMIN access", async () => {

      const admin = await createTestUser("ADMIN");
      const token = generateToken(admin._id, "ADMIN");

      const res = await request(app)
        .get("/api/v1/dashboard/super-admin")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);

    });

    test("should allow SUPER_ADMIN access", async () => {

      const superAdmin = await createTestUser("SUPER_ADMIN");
      const token = generateToken(superAdmin._id, "SUPER_ADMIN");

      const res = await request(app)
        .get("/api/v1/dashboard/super-admin")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

    });

  });

});