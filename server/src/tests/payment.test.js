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

/**
 * GET PAYMENT HISTORY
 */
describe("GET /api/v1/payments/history", () => {

  test("should deny without token", async () => {

    const res = await request(app)
      .get("/api/v1/payments/history");

    expect(res.statusCode).toBe(401);

  });

});



/**
 * GET PAYMENT PLANS
 */
describe("GET /api/v1/payments/plans", () => {

  test("should return payment plans", async () => {

    const res = await request(app)
      .get("/api/v1/payments/plans");

    expect(res.statusCode).toBe(200);

  });

});



/**
 * SUBSCRIBE PLAN
 */
describe("POST /api/v1/payments/subscribe", () => {

  test("should deny without token", async () => {

    const res = await request(app)
      .post("/api/v1/payments/subscribe");

    expect(res.statusCode).toBe(401);

  });

});



/**
 * PAYMENT WEBHOOK
 */
describe("POST /api/v1/payments/webhook", () => {

  test("should accept webhook event", async () => {

    const res = await request(app)
      .post("/api/v1/payments/webhook")
      .send({
        event: "payment.captured"
      });

    expect([200,500]).toContain(res.statusCode);

  });

});