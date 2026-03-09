const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const songRoutes = require("./routes/songRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const djRoutes = require("./routes/djRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();


// Security headers
app.use(helmet());


// Logging (disable in tests)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}


// Rate limiter (disable during tests)
if (process.env.NODE_ENV !== "test") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use(limiter);
}


// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// Body parsing
app.use(express.json());
app.use(cookieParser());


// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/recommend", recommendRoutes);
app.use("/api/v1/djs", djRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/playlists", playlistRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;