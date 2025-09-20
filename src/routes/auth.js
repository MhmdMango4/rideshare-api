const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Routes
router.post("/register", authController.register); // array of middlewares
router.post("/login", authController.login); // single function

module.exports = router;
