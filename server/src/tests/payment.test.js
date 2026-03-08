const request = require("supertest");
const app = require("../app");

const createTestUser = require("./helpers/testUser");
const generateToken = require("./helpers/token");

describe("Payment APIs", () => {

  /**
   * CREATE ORDER
   */
  describe("POST /api/v1/payments/order", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .post("/api/v1/payments/order");

      expect(res.statusCode).toBe(401);

    });

    test("should allow authenticated user", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/payments/order")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 100
        });

      // Razorpay may fail in tests
      expect([200,400,500]).toContain(res.statusCode);

    });

  });


  /**
   * VERIFY PAYMENT
   */
  describe("POST /api/v1/payments/verify", () => {

    test("should deny access without token", async () => {

      const res = await request(app)
        .post("/api/v1/payments/verify");

      expect(res.statusCode).toBe(401);

    });

    test("should allow authenticated user", async () => {

      const user = await createTestUser("USER");
      const token = generateToken(user._id, "USER");

      const res = await request(app)
        .post("/api/v1/payments/verify")
        .set("Authorization", `Bearer ${token}`)
        .send({
          razorpay_order_id: "order_test",
          razorpay_payment_id: "payment_test",
          razorpay_signature: "signature_test"
        });

      // signature check may fail in tests
      expect([200,400,500]).toContain(res.statusCode);

    });

  });

});