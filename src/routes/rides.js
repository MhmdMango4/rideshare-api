const express = require("express");
const router = express.Router();
const { requestRide } = require("../controller/rideController");
const auth = require("../middleware/auth");

router.post("/", auth, requestRide);

module.exports = router;
