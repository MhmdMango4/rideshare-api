const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Optional: serve swagger.json
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/rides", require("./routes/rides"));
// Simple Hello World route
app.get("/", (req, res) => {
  res.status(200).json({
    success: "success",
    message: "Hello World from RideShare API",
    timestamp: new Date().toISOString(),
  });
});

app.use(require("./middleware/errorHandler"));

// Security Middlewares
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 RideShare API running on http://localhost:${PORT}`);
});
