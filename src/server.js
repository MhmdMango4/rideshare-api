require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple Hello World route
app.get("/", (req, res) => {
  res.status(200).json({
    success: "success",
    message: "Hello World from RideShare API",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 RideShare API running on http://localhost:${PORT}`);
});
