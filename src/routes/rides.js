const express = require("express");
const router = express.Router();
const {
  requestRide,
  getRequestedRides,
  acceptRide,
  completedRide,
} = require("../controller/rideController");
const auth = require("../middleware/auth");

// Rider routes
router.post("/", auth, requestRide);

// Driver routes
router.get("/requested", auth, getRequestedRides);
router.put("/:id/accept", auth, acceptRide);
router.put("/:id/complete", auth, completedRide);

module.exports = router;
