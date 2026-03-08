const request = require("supertest");
const app = require("../app");

let token;

describe("Auth APIs", () => {

  /**
   * REGISTER
   */
  describe("POST /api/v1/auth/register", () => {

    test("should register new user", async () => {

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Test User",
          email: "test@gmail.com",
          password: "123456"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);

    });

    test("should fail with duplicate email", async () => {

      await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Duplicate User",
          email: "duplicate@gmail.com",
          password: "123456"
        });

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Duplicate User",
          email: "duplicate@gmail.com",
          password: "123456"
        });

      expect(res.statusCode).toBe(400);

    });

    test("should fail validation with missing fields", async () => {

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "invalid@gmail.com"
        });

      expect(res.statusCode).toBe(400);

    });

  });


  /**
   * LOGIN
   */
  describe("POST /api/v1/auth/login", () => {

    test("should login user successfully", async () => {

      await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Login User",
          email: "login@gmail.com",
          password: "123456"
        });

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "login@gmail.com",
          password: "123456"
        });

      token = res.body.token || res.headers["set-cookie"];

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

    });

    test("should fail with wrong password", async () => {

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "login@gmail.com",
          password: "wrongpassword"
        });

      expect(res.statusCode).toBe(401);

    });

  });


});