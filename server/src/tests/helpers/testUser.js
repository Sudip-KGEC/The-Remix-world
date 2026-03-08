const User = require("../../models/User");
const bcrypt = require("bcryptjs");

async function createTestUser(role = "USER") {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await User.create({
    name: "Test User",
    email: `test${Date.now()}@mail.com`,
    password: hashedPassword,
    role: role
  });

  return user;
}

module.exports = createTestUser;