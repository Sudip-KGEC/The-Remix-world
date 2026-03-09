const User = require("../../models/User");
const bcrypt = require("bcryptjs");

async function createTestUser(role = "USER", overrides = {}) {

  const hashedPassword = await bcrypt.hash("password123", 10);

  const userData = {
    name: "Test User",
    email: `test_${Date.now()}_${Math.floor(Math.random()*1000)}@mail.com`,
    password: hashedPassword,
    role,
    ...overrides
  };

  const user = await User.create(userData);

  return user;
}

module.exports = createTestUser;