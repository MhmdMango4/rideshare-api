const Ride = require("../models/Ride");
const User = require("../models/User");

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
