const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/api/auth" , authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;