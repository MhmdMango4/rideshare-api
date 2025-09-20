const Ride = require("../models/Ride");
const User = require("../models/User");
const { validateTransition } = require("../utils/rideStateMachine");

// @desc    Request a new ride
// @route   POST /api/rides
// @access  Private (Rider)
exports.requestRide = async (req, res) => {
  const { pickup, destination, price } = req.body;

  try {
    const newRide = new Ride({
      rider: req.user.id,
      pickup,
      destination,
      price,
      status: "requested",
    });

    const ride = await newRide.save();

    res.status(201).json({
      success: true,
      ride,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get all requested rides (for drivers)
// @route   GET /api/rides/requested
// @access  Private (Driver)

exports.getRequestedRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      status: "requested",
    }).populate("rider", "name email");
    res.json(rides);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Accept a ride
// @route   PUT /api/rides/:id/accept
// @access  Private (Driver)
exports.acceptRide = async (req, res) => {
  try {
    let ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    try {
      validateTransition(ride.status, "accepted");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    ride.driver = req.user.id;
    ride.status = "accepted";

    await ride.save();

    res.json({
      success: true,
      ride,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Complete a ride
// @route   PUT /api/rides/:id/complete
// @access  Private (Driver)
exports.completedRide = async (req, res) => {
  try {
    let ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    try {
      validateTransition(ride.status, "completed");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to complete this ride",
      });
    }

    ride.status = "completed";

    await ride.save();

    res.json({
      success: true,
      ride,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get all rides (Admin only)
// @route   GET /api/rides
// @access  Private (Admin)
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("rider", "name email")
      .populate("driver", "name email");
    res.json(rides);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete a ride (Admin only)
// @route   DELETE /api/rides/:id
// @access  Private (Admin)
exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    await ride.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ride removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
