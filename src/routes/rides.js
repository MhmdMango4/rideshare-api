const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");

const router = express.Router();
const {
  requestRide,
  getRequestedRides,
  acceptRide,
  completedRide,
  getAllRides,
  deleteRide,
} = require("../controller/rideController");

// Rider routes
router.post("/", auth, requestRide);

// Driver routes
router.get("/requested", auth, getRequestedRides);
router.put("/:id/accept", auth, acceptRide);
router.put("/:id/complete", auth, completedRide);

// Admin routes
router.get("/", auth, isAdmin, getAllRides);
router.delete("/:id", auth, isAdmin, deleteRide);

module.exports = router;
